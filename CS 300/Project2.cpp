#include <vector>
#include <fstream>
#include <iostream>
#include <algorithm>
#include <sstream>

using namespace std;

//============================================================================
// Global functions
//============================================================================

// Helper function to trim whitespace from both ends of a string
string trim(const string& str) {
    auto start = str.begin();
    while (start != str.end() && isspace(*start)) {
        start++;
    }

    auto end = str.end();
    do {
        end--;
    } while (distance(start, end) > 0 && isspace(*end));

    return string(start, end + 1);
}

/**
 * Converts a string to uppercase.
 * @param str The string to convert.
 * @return The uppercase version of the string.
 */
string toUpper(string str) {
    transform(str.begin(), str.end(), str.begin(), ::toupper);
    return str;
}

/**
 * Splits a string by a delimiter and returns a vector of substrings.
 * @param str The string to split.
 * @param delimiter The character to split the string by.
 * @return A vector of substrings.
 */
vector<string> split(const string str, char delimiter) {
    vector<string> tokens;
    size_t start = 0;
    size_t end = str.find(delimiter);
    string token;

    while (end != string::npos) {
        // get subtrsing from start to end and trim whitespace
        token = trim(str.substr(start, end - start));  
        
        // skip empty tokens
        if (!token.empty()) tokens.push_back(token); 

        // move start to end + 1 to skip the delimiter
        start = end + 1;
        end = str.find(delimiter, start);
    }

    // trim whitespace from the last token
    token = trim(str.substr(start)); 

    // add the last token if it's not empty
    if (!token.empty()) tokens.push_back(token);

    return tokens;
}

//============================================================================
// Course/CourseTree methods and structs
//============================================================================

struct Course {
    string courseId; // unique identifier
    string title;
    vector<string> prerequisites;
    Course *left;
    Course *right;

    // Default Constructor 
    Course() {
      this->left = nullptr;
      this->right = nullptr;
    }

    // Constructor
    Course(string courseId, string title, vector<string> prerequisites) {
        this->courseId = courseId;
        this->title = title;
        this->prerequisites = prerequisites;
        this->left = nullptr;
        this->right = nullptr;
    }
};

class CourseTree {
    private:
        Course* root;
        void addCourse(Course* course, string courseId, string title, vector<string> prerequisites);
        void printCompSciCoursesInOrder(Course* course);
        void deleteTree(Course* course);

    public:
        CourseTree();
        virtual ~CourseTree();
        void PrintCourse(Course course);
        void PrintCompSciCoursesInOrder();
        void LoadCoursesFromFile(string filename);
        void Insert(string courseId, string title, vector<string> prerequisites);
        Course Search(string courseId);
};

/**
 * Default constructor
 */
CourseTree::CourseTree() : root(nullptr) {}

/**
 * Destructor
 */
CourseTree::~CourseTree() {
    deleteTree(root);
}

/**
 * Recursively delete all nodes in the tree
 */
void CourseTree::deleteTree(Course* course) {
    if (course == nullptr) {
        return;
    }

    // Recursively delete left and right subtrees
    deleteTree(course->left);
    deleteTree(course->right);

    // Delete the current node
    delete course;
}

/**
 * Loads courses from a file and inserts them into the course tree.
 * @param filename The name of the file containing course data.
 */
void CourseTree::LoadCoursesFromFile(string filename) {
    ifstream file(filename);

    if (!file.is_open()) {
        cerr << "Error: Could not open the file " << filename << endl;
        return;
    }

    int courseCount = 0;
    string line;
    vector<string> course_data;
    
    while (getline(file, line)) {
        stringstream ss(line);
        string course_string;

        // Read the entire line into course_string
        getline(ss, course_string);

        // Split the course_string by commas
        vector<string> course_data = split(course_string, ',');

        if (course_data.size() < 2 || course_data[0].empty() || course_data[1].empty()) {
            cerr << "Error: Missing courseId or title in line #" << courseCount << ": " << line << endl;
            continue;  // Skip this line
        }

        string courseId = course_data[0];
        string title = course_data[1];

        // Assign prerequisites from index 2 onward
        vector<string> prerequisites;

        if (course_data.size() > 2) {
            prerequisites.assign(course_data.begin() + 2, course_data.end());
        }

        // Insert the course into the tree
        Insert(courseId, title, prerequisites);
        courseCount++;
    }
    
    file.close();
    
    cout << endl << courseCount << " courses loaded." << endl; 
}

/**
 * Traverse the tree in order
 */
void CourseTree::PrintCompSciCoursesInOrder() {
    printCompSciCoursesInOrder(root);
}

/**
 * Insert a course
 */
void CourseTree::Insert(string courseId, string title, vector<string> prerequisites) {
    // Convert courseId to uppercase for consistency
    string uppercaseCourseId = toUpper(courseId);
  
    if (root == nullptr) // Tree is empty
    {
        root = new Course(uppercaseCourseId, title, prerequisites);
        return;
    } 

    addCourse(root, uppercaseCourseId, title, prerequisites); 
}

/**
 * Search for a course
 */
Course CourseTree::Search(string courseId) {
    Course* currentCourse = root;
    string uppercaseCourseId = toUpper(courseId); // All courseIDs are stored in uppercase

    while (currentCourse != nullptr) {
      // if course is found return course
      if (currentCourse->courseId == uppercaseCourseId) {
          return *currentCourse;  // Dereference the pointer and return a copy of the course
      }  

      // if courseId is less than current course then traverse left
      if (currentCourse->courseId > uppercaseCourseId) currentCourse = currentCourse->left;
      else currentCourse = currentCourse->right;
    }
    
    Course course;
    return course;
}

/**
 * Add a course to the tree (recursive)
 * @param course Current course in tree
 * @param courseId course id to be added
 * @param title course title to be added
 * @param prerequisites course prerequisites to be added
 */
void CourseTree::addCourse(Course* course, string courseId, string title, vector<string> prerequisites) {
    // if course is smaller than current node 
    if (course->courseId > courseId) {
      if (course->left == nullptr) course->left = new Course(courseId, title, prerequisites); // add course to left

      else addCourse(course->left, courseId, title, prerequisites); // recurse left subtree

      return;
    }

    // else course is considered larger than current node
    if (course->right == nullptr) course->right = new Course(courseId, title, prerequisites); // add node to right

    else addCourse(course->right, courseId, title, prerequisites); // recurse right subtree
}

/** 
 * Performs an in-order traversal, printing the course ID and title
 * for each course with an ID containing "CSCI" or "MATH".
 * @param course The root node of the subtree to print.
 */
void CourseTree::printCompSciCoursesInOrder(Course* course) {
    if (course == nullptr) return; // stop traversing if node is empty

    printCompSciCoursesInOrder(course->left); // traverse left subtree 

    if (course->courseId.find("CSCI") != string::npos || course->courseId.find("MATH") != string::npos) {
        cout << course->courseId << ", " << course->title << endl;
    }

    printCompSciCoursesInOrder(course->right); // traverse right subtree after left subtree and current node
}

/**
 * Outputs the course ID, title, and prerequisites.
 * @param course The course to print.
 */
void printCourseDetails(const Course course) {
    cout << course.courseId << ", " << course.title << endl;
    cout << "Prerequisites: ";

    if (course.prerequisites.size() == 0) {
        cout << "None" << endl;
        return;
    } 
    for (const string prerequisite : course.prerequisites) {
        cout << prerequisite;
        if (prerequisite != course.prerequisites.back()) {
            cout << ", ";
        }
    }
    cout << endl; // Ensure the output ends with a newline
}

/**
 * The one and only main() method
 */
int main(int argc, char* argv[]) {
    string filename;

    if (argc < 2) {
      cout << "Enter the filename containing course data: ";
      getline(cin, filename);
    }
    else {
      filename = argv[1];
    }

    // Define a binary search tree to hold all courses
    CourseTree* courseTree = new CourseTree();
    Course course;
    string courseId;
    int choice = 0;

    cout << endl << "Welcome to the course planner." << endl;
    
    while (choice != 9) {
        cout << endl << "  1. Load Data Structure." << endl;
        cout << "  2. Print Computer Science Courses." << endl;
        cout << "  3. Print Course." << endl;
        cout << "  9. Exit" << endl;
        cout << endl << "What would you like to do? ";

        // If input is not an integer, clear the error state and ignore the invalid input
        if (!(cin >> choice)) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Invalid input. Please enter a number." << endl;
            continue;
        }

        cin.ignore(); // To ignore the newline character after input

        switch (choice) {
            case 1:
                courseTree->LoadCoursesFromFile(filename);
                break;

            case 2:
                cout << "Here is a sample schedule:" << endl << endl;
                courseTree->PrintCompSciCoursesInOrder();
                break;

            case 3:
                cout << endl << "What course do you want to know about? ";
                getline(cin, courseId);
                
                course = courseTree->Search(courseId);

                if (!course.courseId.empty()) {
                    printCourseDetails(course);
                } else {
                    cout << "Course Id " << courseId << " not found." << endl;
                }
                break;

            case 9:
                break;

            default:
                cout << choice << " is not a valid option." << endl;
                break;
        }
      }

    cout << "Thank you for using the course planner!" << endl;

	  return 0;
}
