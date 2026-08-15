package contactservice;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ContactService {
    private final Connection connection;

    public ContactService() {
        try {
            Class.forName("org.sqlite.JDBC");
            this.connection = DriverManager.getConnection("jdbc:sqlite::memory:");
            initializeSchema();
        } catch (ClassNotFoundException | SQLException e) {
            throw new IllegalStateException("Unable to initialize SQLite contact database.", e);
        }
    }

    private void initializeSchema() throws SQLException {
        try (Statement statement = connection.createStatement()) {
            statement.executeUpdate(
                "CREATE TABLE IF NOT EXISTS contacts ("
                    + "contact_id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    + "first_name TEXT NOT NULL, "
                    + "last_name TEXT NOT NULL, "
                    + "phone TEXT, "
                    + "address TEXT NOT NULL"
                    + ")"
            );
        }
    }

    public Contact addContact(Contact contact) {
        if (contact == null) {
            throw new IllegalArgumentException("Contact cannot be null.");
        }

        String sql = "INSERT INTO contacts (first_name, last_name, phone, address) VALUES (?, ?, ?, ?)";

        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, contact.getFirstName());
            statement.setString(2, contact.getLastName());
            statement.setString(3, contact.getPhone());
            statement.setString(4, contact.getAddress());
            statement.executeUpdate();

            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    String generatedId = String.valueOf(generatedKeys.getLong(1));
                    return new Contact(generatedId, contact.getFirstName(), contact.getLastName(), contact.getPhone(), contact.getAddress());
                }
            }

            return contact;
        } catch (SQLException e) {
            throw new IllegalStateException("Unable to add contact.", e);
        }
    }

    // Return all contacts ordered by contact_id
    public List<Contact> getAllContacts() {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT contact_id, first_name, last_name, phone, address FROM contacts ORDER BY contact_id")) {
            try (ResultSet rs = statement.executeQuery()) {
                List<Contact> list = new ArrayList<>();
                while (rs.next()) {
                    list.add(new Contact(
                            rs.getString("contact_id"),
                            rs.getString("first_name"),
                            rs.getString("last_name"),
                            rs.getString("phone"),
                            rs.getString("address")
                    ));
                }
                return list;
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Unable to list contacts.", e);
        }
    }

    public void deleteContact(String contactId) {
        if (contactId == null || contactId.trim().isEmpty()) {
            throw new IllegalArgumentException("Contact ID cannot be empty.");
        }

        try (PreparedStatement statement = connection.prepareStatement("DELETE FROM contacts WHERE contact_id = ?")) {
            statement.setString(1, contactId);
            if (statement.executeUpdate() == 0) {
                throw new IllegalArgumentException("Contact with this ID does not exist.");
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Unable to delete contact.", e);
        }
    }

    public void updateContact(String contactId, String firstName, String lastName, String phone, String address) {
        Contact existingContact = getContact(contactId);
        if (existingContact == null) {
            throw new IllegalArgumentException("Contact with this ID does not exist.");
        }

        String updatedFirstName = firstName != null ? firstName : existingContact.getFirstName();
        String updatedLastName = lastName != null ? lastName : existingContact.getLastName();
        String updatedPhone = phone != null ? phone : existingContact.getPhone();
        String updatedAddress = address != null ? address : existingContact.getAddress();

        Contact updatedContact = new Contact(contactId, updatedFirstName, updatedLastName, updatedPhone, updatedAddress);

        try (PreparedStatement statement = connection.prepareStatement(
                "UPDATE contacts SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE contact_id = ?")) {
            statement.setString(1, updatedContact.getFirstName());
            statement.setString(2, updatedContact.getLastName());
            statement.setString(3, updatedContact.getPhone());
            statement.setString(4, updatedContact.getAddress());
            statement.setString(5, updatedContact.getContactId());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Unable to update contact.", e);
        }
    }

    public Contact getContact(String contactId) {
        if (contactId == null || contactId.trim().isEmpty()) {
            throw new IllegalArgumentException("Contact ID cannot be empty.");
        }

        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT contact_id, first_name, last_name, phone, address FROM contacts WHERE contact_id = ?")) {
            statement.setString(1, contactId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (!resultSet.next()) {
                    return null;
                }
                return new Contact(
                        resultSet.getString("contact_id"),
                        resultSet.getString("first_name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("phone"),
                        resultSet.getString("address")
                );
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Unable to retrieve contact.", e);
        }
    }
}
