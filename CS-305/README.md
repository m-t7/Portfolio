**Briefly summarize your client, Artemis Financial, and its software requirements. Who was the client? What issue did the company want you to address?**

- Artemis Financial develops personalized financial plans and aims to modernize operations with secure custom software, including a RESTful API. They want to implement the latest software security and have consulted Global Rain to assess vulnerabilities.

**What did you do well when you found your client’s software security vulnerabilities? Why is it important to code securely? What value does software security add to a company’s overall well-being?**

- By analyzing Artemis Financial's situation and conducting a static analysis of their codebase, I identified numerous vulnerabilities and proposed potential solutions to help the company resolve these issues in the near future.
- Secure software helps prevent cybersecurity attacks, protects client data, and enhances organizational well-being by ensuring compliance with regulations and providing peace of mind to customers.
  
**Which part of the vulnerability assessment was challenging or helpful to you?**

- Learning to run the Maven dependency-check tool was somewhat challenging due to my unfamiliarity with the Eclipse IDE. However, reviewing the vulnerabilities and their details in the HTML report file was helpful.

**How did you increase layers of security? In the future, what would you use to assess vulnerabilities and decide which mitigation techniques to use?**

- I've improved the layers of security within the API by enforcing the use of HTTPS, adding input validation, exception handling, updating packages, and simplifying the existing codebase.
- In the future, I will continue to use static testing and incremental, non-breaking changes to assess and mitigate vulnerabilities within applications.
 
**How did you make certain the code and software application were functional and secure? After refactoring the code, how did you check to see whether you introduced new vulnerabilities?**

- Functional testing and unit tests can helped ensure the software application was both functional and secured against common attacks and properly handled exceptions for edge cases.
- After refactoring the code, I ran the maven dependency-check tool to ensure no new vulnerabilities were introduced as a result of my changes.

**What resources, tools, or coding practices did you use that might be helpful in future assignments or tasks?**

- Secure coding practices, maven's dependency-check tool, and the NIST website would all be helpful during development on future projects and tasks. 

**Employers sometimes ask for examples of work that you have successfully completed to show your skills, knowledge, and experience. What might you show future employers from this assignment?**

- The refactored code base for the RESTful API and problem statement from this assignment would be a good way to demonstrate experience solving vulnerability issues to future employers.
