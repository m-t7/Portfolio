package test;

import contactservice.Contact;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ContactTest {

    @Test
    void testValidContactCreation() {
        Contact contact = new Contact("1234567890", "Michael", "Rosenau", "1234567890", "123 Main St.");
        assertNotNull(contact);
        assertEquals("1234567890", contact.getContactId());
        assertEquals("Michael", contact.getFirstName());
        assertEquals("Rosenau", contact.getLastName());
        assertEquals("1234567890", contact.getPhone());
        assertEquals("123 Main St.", contact.getAddress());
    }

    @Test
    void testInvalidContactIdTooLong() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Contact("12345678901", "Martin", "Brocklesnar", "1234567890", "123 Main St.");
        });
    }

    @Test
    void testFirstNameTooLong() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Contact("1234567890", "MadMakerManniker", "Creationist", "1234567890", "123 Main St.");
        });
    }
    
    @Test
    void testLastNameTooLong() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Contact("1234567890", "Clad", "InBlackAndBlueOhWhatAParticularHue", "1234567890", "123 Main St.");
        });
    }

    @Test
    void testPhoneNumberNotTenDigits() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Contact("1234567890", "Nicole", "Hartwell", "12345", "123 Main St.");
        });
    }

    @Test
    void testPhoneNumberNotDigits() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Contact("1234567890", "Bill", "Bryer", "abcdefghi0", "123 Main St.");
        });
    }

    @Test
    void testAddressTooLong() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Contact("1234567890", "Kiran", "Biswas", "1234567890", "123 Main Street, Some City, Some Country");
        });
    }

    @Test
    void testNullFirstName() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Contact("1234567890", null, "Doe", "1234567890", "123 Main St.");
        });
    }

    @Test
    void testNullPhone() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Contact("1234567890", "Tre", "Budichecker", null, "123 Main St.");
        });
    }

    @Test
    void testNullAddress() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Contact("1234567890", "Ronald", "Peterson", "1234567890", null);
        });
    }
}
