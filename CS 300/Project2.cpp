#include <vector>
#include <fstream>
#include <iostream>
#include <algorithm>
#include <sstream>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <limits>

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
// Course/CourseCatalog methods and structs
//============================================================================

struct Course {
    string courseId;
    string title;
    string discipline;
    vector<string> prerequisites;

    Course() = default;

    Course(const string& id,
            const string& title,
            const string& discipline,
            const vector<string>& prereqs)
        : courseId(id),
          title(title),
          discipline(discipline),
          prerequisites(prereqs) {}
};

class CourseCatalog {
private:
    unordered_map<string, Course> courses;
    unordered_map<string, vector<string>> disciplineIndex;

public:
    void LoadCoursesFromFile(const string& filename);
    const Course* Search(const string& courseId);
    vector<Course> ListCoursesInDiscipline(const string& discipline);
    vector<string> GetPrerequisites(const string& courseId);
};

/**
 * Loads courses from a file and inserts them into the course tree.
 * @param filename The name of the file containing course data.
 */
void CourseCatalog::LoadCoursesFromFile(const string& filename) {
    ifstream file(filename);

    if (!file.is_open()) {
        cerr << "Error: Could not open the file " << filename << endl;
        return;
    }

    string line;
    vector<string> course_data;
    
    while (getline(file, line)) {

        // Split the course_string by commas
        vector<string> course_data = split(line, ',');

        if (course_data.size() < 3 || course_data[0].empty() || course_data[1].empty() || course_data[2].empty()) {
            continue;  // Skip this line
        }

        string courseId = course_data[0];
        string title = course_data[1];
        string discipline = course_data[2]; 

        // Assign prerequisites from index 2 onward
        vector<string> prerequisites;

        prerequisites.assign(course_data.begin() + 2, course_data.end());

        // Insert the course into the tree
        courses[courseId] = Course(courseId, title, discipline, prerequisites);
        disciplineIndex[discipline].push_back(courseId);
    }
    
    file.close();
    
    cout << endl << courses.size() << " courses loaded." << endl; 
}

const Course* CourseCatalog::Search(const string& courseId) {

    string id = toUpper(trim(courseId));

    auto it = courses.find(id);

    if (it == courses.end())
        return nullptr;

    return &it->second;
}

vector<Course> CourseCatalog::ListCoursesInDiscipline(const string& discipline) {

    vector<Course> results;

    auto it = disciplineIndex.find(trim(discipline));

    if (it == disciplineIndex.end())
        return results;

    for (const auto& id : it->second) {

        auto courseIt = courses.find(id);

        if (courseIt != courses.end()) {
            results.push_back(courseIt->second);
        }
    }

    return results;
}

vector<string> CourseCatalog::GetPrerequisites(const string& courseId) {

    string start = toUpper(trim(courseId));

    unordered_set<string> visited;
    queue<string> q;

    q.push(start);

    while (!q.empty()) {

        string current = q.front();
        q.pop();

        auto it = courses.find(current);

        if (it == courses.end())
            continue;

        for (const auto& prereq : it->second.prerequisites) {

            if (visited.insert(prereq).second) {

                if (courses.find(prereq) != courses.end()) {
                    q.push(prereq);
                }
            }
        }
    }

    return vector<string>(visited.begin(), visited.end());
}

/**
 * Outputs the course ID, title, and prerequisites.
 * @param course The course to print.
 */
void printCourseDetails(const Course& course) {
    cout << course.courseId << ", " << course.title << endl;
    cout << "Prerequisites: ";

    if (course.prerequisites.empty()) {
        cout << "None" << endl;
        return;
    }

    for (size_t i = 0; i < course.prerequisites.size(); i++) {
        cout << course.prerequisites[i];

        if (i < course.prerequisites.size() - 1) {
            cout << ", ";
        }
    }

    cout << endl;
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

    CourseCatalog catalog;
    string courseId;
    int choice = 0;

    cout << endl << "Welcome to the course planner." << endl;

    while (choice != 9) {
        cout << endl << "  1. Load Data Structure." << endl;
        cout << "  2. Print Computer Science Courses." << endl;
        cout << "  3. Print Course." << endl;
        cout << "  9. Exit" << endl;
        cout << endl << "What would you like to do? ";

        if (!(cin >> choice)) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Invalid input. Please enter a number." << endl;
            continue;
        }

        cin.ignore();

        switch (choice) {
            case 1:
                catalog.LoadCoursesFromFile(filename);
                break;

            case 2: {
                cout << "Here are the Computer Science courses:" << endl << endl;

                vector<Course> csCourses = catalog.ListCoursesInDiscipline("CSCI");

                for (const Course& course : csCourses) {
                    cout << course.courseId << ", " << course.title << endl;
                }

                break;
            }

            case 3: {
                cout << endl << "What course do you want to know about? ";
                getline(cin, courseId);

                const Course* course = catalog.Search(courseId);

                if (course != nullptr) {
                    printCourseDetails(*course);
                }
                else {
                    cout << "Course Id " << courseId << " not found." << endl;
                }

                break;
            }

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
