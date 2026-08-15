package test;

import contactservice.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

class ContactServiceTest {
	
	private ContactService service;
    private Contact contact;
    
    @BeforeEach
    void setUp() {
        service = new ContactService();
        contact = new Contact("1234567890", "John", "Doe", "1234567890", "123 Main St.");
        service.addContact(contact);
    }
	
	@Test
    void testAddContact() {
        Contact fetchedContact = service.getContact("1234567890");
        assertNotNull(fetchedContact);
        assertEquals("1234567890", fetchedContact.getContactId());
    }
	
	@Test
    void testDeleteExistingContact() {
        Contact newContact = new Contact("1234567899", "Samuel", "Hill", "1234567890", "123 Main St.");
        service.addContact(newContact);
        
        service.deleteContact(newContact.getContactId());
        Contact fetchedContact = service.getContact(newContact.getContactId());

        assertNull(fetchedContact);
    }
	
	@Test
    void testDeleteNonexistentContact() {
        ContactService service = new ContactService();
        
        assertThrows(IllegalArgumentException.class, () -> {
        	service.deleteContact("0000000000");
        });
    }
	
    @Test
    void testUpdateContactValidFields() {
        // Update with valid fields
        service.updateContact("1234567890", "Johnny", "Does", "0987654321", "456 Main St.");

        Contact updatedContact = service.getContact("1234567890");

        assertEquals("Johnny", updatedContact.getFirstName());
        assertEquals("Does", updatedContact.getLastName());
        assertEquals("0987654321", updatedContact.getPhone());
        assertEquals("456 Main St.", updatedContact.getAddress());
    }

    @Test
    void testUpdateContactInvalidContactId() {
        // Try to update a contact with an invalid ID
        assertThrows(IllegalArgumentException.class, () -> {
        	service.updateContact("invalidId", "Johnny", "Does", "0987654321", "456 Main St.");
        });
    }

    @Test
    void testUpdateContactFirstNameTooLong() {
        // Try to update first name with a value longer than 10 characters
        assertThrows(IllegalArgumentException.class, () -> {
        	service.updateContact("1234567890", "ThisIsTooLongFirstName", "Does", "0987654321", "456 Main St.");
        });
    }

    @Test
    void testUpdateContactLastNameTooLong() {
        // Try to update last name with a value longer than 10 characters
        assertThrows(IllegalArgumentException.class, () -> {
        	service.updateContact("1234567890", "Johnny", "ThisIsTooLongLastName", "0987654321", "456 Main St.");
        });
    }

    @Test
    void testUpdateContactPhoneNumberTooShort() {
        // Try to update with a phone number that is too short
        assertThrows(IllegalArgumentException.class, () -> {
        	service.updateContact("1234567890", "Johnny", "Does", "12345", "456 Main St.");
        });
    }

    @Test
    void testUpdateContactPhoneNumberInvalidCharacters() {
        // Try to update with an invalid phone number (non-digit characters)
        assertThrows(IllegalArgumentException.class, () -> {
        	service.updateContact("1234567890", "Johnny", "Does", "12345abcd", "456 Main St.");
        });
    }

    @Test
    void testUpdateContactAddressTooLong() {
        // Try to update address with a value longer than 30 characters
        assertThrows(IllegalArgumentException.class, () -> {
        	service.updateContact("1234567890", "Johnny", "Does", "0987654321", "This is a very long address that exceeds the limit");
        });
    }

    @Test
    void testUpdateContactWithNullValues() {;
      	service.updateContact("1234567890", null, null, null, null);

        Contact updatedContact = service.getContact("1234567890");

        assertNotNull(updatedContact.getFirstName());  
        assertNotNull(updatedContact.getLastName());   
        assertNotNull(updatedContact.getPhone());      
        assertNotNull(updatedContact.getAddress());    
    }

    @Test
    void testUpdateContactEmptyFirstName() {
        // Try to update with an empty first name (invalid)
        assertThrows(IllegalArgumentException.class, () -> {
        	service.updateContact("1234567890", "", "Does", "0987654321", "456 Main St.");
        });
    }

    @Test
    void testUpdateContactEmptyLastName() {
        // Try to update with an empty last name (invalid)
        assertThrows(IllegalArgumentException.class, () -> {
        	service.updateContact("1234567890", "Johnny", "", "0987654321", "456 Main St.");
        });
    }

    @Test
    void testUpdateContactEmptyAddress() {
        // Try to update with an empty address (invalid)
        assertThrows(IllegalArgumentException.class, () -> {
        	service.updateContact("1234567890", "Johnny", "Does", "0987654321", "");
        });
    }
}

