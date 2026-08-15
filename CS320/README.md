**Contact service — Run with Maven**

Prerequisites:
- Java JDK 17+ (JDK 21 recommended)
- Apache Maven (on PATH)

From the project root (`CS320`) run these Maven commands:

- Compile sources:

```bash
mvn clean compile
```

- Run the GUI application (exec plugin):

```bash
mvn exec:java -Dexec.mainClass=contactservice.ContactFormApp
```

- Run unit tests:

```bash
mvn test
```

- Package (produce `target/cs320-1.0-SNAPSHOT.jar`):

```bash
mvn package
```

Run the compiled classes directly (example, adjust paths for your OS):

```bash
java -cp "target/classes:sqlite-jdbc-3.45.3.0.jar:slf4j-api-2.0.13.jar" contactservice.ContactFormApp
```

The `pom.xml` declares the SQLite JDBC and SLF4J dependencies; `mvn exec:java` and `mvn test` will download and use them automatically.

