package contactservice;

public class Contact {
	private final String contactId;
	private String firstName;
	private String lastName;
	private String phone;
	private String address;
	
	// Constructor
	public Contact(String contactId, String firstName, String lastName, String phone, String address) {
		this.validateStringField(contactId, "Contact ID", 10);
		this.validateStringField(firstName, "First Name", 10);
		this.validateStringField(lastName, "Last Name", 10);
		this.validatePhone(phone);
		this.validateStringField(address, "Address", 30);

		this.contactId = contactId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.address = address;
	}

	// Getters
	public String getContactId() {
		return contactId;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getAddress() {
		return address;
	}
  
	public String getPhone() {
		return phone;
	}

	// Setters 
	public void setFirstName(String firstName) {
		this.validateStringField(firstName, "First Name", 10);
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.validateStringField(lastName, "Last Name", 10);
		this.lastName = lastName;
	}

	public void setAddress(String address) {
		this.validateStringField(address, "Address", 30);
		this.address = address;
	}

	public void setPhone(String phone) {
		this.validatePhone(phone);
		this.phone = phone;
	}

	private void validatePhone(String phone) {
		if (phone == null || phone.length() != 10 || !phone.matches("\\d{10}")) {
			throw new IllegalArgumentException("Phone must be exactly 10 digits.");
		}
	}

	private void validateStringField(String field, String fieldName, int maxLength) {
		if (field == null || field.isEmpty() || field.length() > maxLength) {
			throw new IllegalArgumentException(fieldName + " cannot be null or longer than " + maxLength + " characters.");
		}
	}
}
