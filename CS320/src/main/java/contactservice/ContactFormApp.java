package contactservice;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class ContactFormApp extends JFrame {

    private final JTextField firstNameField = new JTextField(20);
    private final JTextField lastNameField = new JTextField(20);
    private final JTextField phoneField = new JTextField(20);
    private final JTextArea addressArea = new JTextArea(4, 20);
    private final DefaultTableModel tableModel = new DefaultTableModel(new Object[]{"ID","First","Last","Phone","Address"}, 0) {
        @Override
        public boolean isCellEditable(int row, int column) { return false; }
    };
    private final JTable contactsTable = new JTable(tableModel);
    private JTabbedPane tabbedPane;
    private String editingId = null;

    private final ContactService service = new ContactService();

    public ContactFormApp() {
        super("Contact Manager");

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(500, 420);
        setLocationRelativeTo(null);

        buildUI();
    }

    private void buildUI() {
        Font font = new Font("Segoe UI", Font.PLAIN, 14);

        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(new EmptyBorder(20, 20, 20, 20));
        panel.setBackground(Color.WHITE);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(8, 8, 8, 8);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 1.0;

        JLabel title = new JLabel("Contact Manager");
        title.setFont(new Font("Segoe UI", Font.BOLD, 22));
        title.setHorizontalAlignment(SwingConstants.CENTER);

        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        panel.add(title, gbc);

        gbc.gridwidth = 1;

        firstNameField.setFont(font);
        lastNameField.setFont(font);
        phoneField.setFont(font);
        addressArea.setFont(font);
        addField(panel, gbc, 1, "First Name", firstNameField);
        addField(panel, gbc, 2, "Last Name", lastNameField);
        addField(panel, gbc, 3, "Phone (optional)", phoneField);

        gbc.gridx = 0;
        gbc.gridy = 5;
        gbc.gridwidth = 2;

        JLabel addressLabel = new JLabel("Address");
        addressLabel.setFont(font);
        panel.add(addressLabel, gbc);

        addressArea.setLineWrap(true);
        addressArea.setWrapStyleWord(true);

        JScrollPane scrollPane = new JScrollPane(addressArea);

        gbc.gridy = 6;
        panel.add(scrollPane, gbc);

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        buttonPanel.setBackground(Color.WHITE);

        JButton saveButton = new JButton("Save Contact");
        JButton clearButton = new JButton("Clear");

        saveButton.setFont(font);
        clearButton.setFont(font);

        saveButton.setBackground(new Color(0, 120, 215));
        saveButton.setForeground(Color.WHITE);
        saveButton.setFocusPainted(false);

        saveButton.addActionListener(e -> saveContact());
        clearButton.addActionListener(e -> clearForm());

        buttonPanel.add(clearButton);
        buttonPanel.add(saveButton);

        gbc.gridy = 7;
        panel.add(buttonPanel, gbc);

        getRootPane().setDefaultButton(saveButton);

        tabbedPane = new JTabbedPane();
        tabbedPane.addTab("Add Contact", panel);
        tabbedPane.addTab("Contacts", buildListPanel());
        tabbedPane.addChangeListener(e -> {
            if (tabbedPane.getSelectedIndex() == 1) {
                refreshContacts();
            }
        });
        add(tabbedPane);
    }

    private JScrollPane buildListPanel() {
        JPanel listPanel = new JPanel(new BorderLayout());
        contactsTable.setFillsViewportHeight(true);
        listPanel.add(new JScrollPane(contactsTable), BorderLayout.CENTER);

        JPanel control = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        JButton refresh = new JButton("Refresh");
        refresh.addActionListener(e -> refreshContacts());
        JButton delete = new JButton("Delete");
        delete.addActionListener(e -> {
            int row = contactsTable.getSelectedRow();
            if (row < 0) {
                JOptionPane.showMessageDialog(this, "Select a contact to delete.", "No Selection", JOptionPane.WARNING_MESSAGE);
                return;
            }
            
            // can't have folks deleting contacts by accident, so confirm
            String id = String.valueOf(tableModel.getValueAt(row, 0));
            int resp = JOptionPane.showConfirmDialog(this, "Delete contact " + id + "?", "Confirm Delete", JOptionPane.YES_NO_OPTION);
            if (resp == JOptionPane.YES_OPTION) {
                try {
                    service.deleteContact(id);
                    refreshContacts();
                } catch (IllegalArgumentException ex) {
                    JOptionPane.showMessageDialog(this, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });
        control.add(delete);
        control.add(refresh);
        listPanel.add(control, BorderLayout.SOUTH);

        refreshContacts();

        // double-click to edit
        contactsTable.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (e.getClickCount() == 2) {
                    int row = contactsTable.rowAtPoint(e.getPoint());
                    if (row >= 0) {
                        String id = String.valueOf(tableModel.getValueAt(row, 0));
                        Contact c = service.getContact(id);
                        if (c != null) {
                            editingId = id;
                            firstNameField.setText(c.getFirstName());
                            lastNameField.setText(c.getLastName());
                            phoneField.setText(c.getPhone() == null ? "" : c.getPhone());
                            addressArea.setText(c.getAddress());
                            tabbedPane.setSelectedIndex(0);
                        }
                    }
                }
            }
        });
        return new JScrollPane(listPanel);
    }

    private void refreshContacts() {
        SwingUtilities.invokeLater(() -> {
            tableModel.setRowCount(0);
            List<Contact> all = service.getAllContacts();
            for (Contact c : all) {
                tableModel.addRow(new Object[]{c.getContactId(), c.getFirstName(), c.getLastName(), c.getPhone(), c.getAddress()});
            }
        });
    }

    private void addField(JPanel panel, GridBagConstraints gbc, int row, String labelText, JTextField field) {
        Font font = new Font("Segoe UI", Font.PLAIN, 14);

        JLabel label = new JLabel(labelText);
        label.setFont(font);

        gbc.gridx = 0;
        gbc.gridy = row;
        gbc.weightx = 0;
        panel.add(label, gbc);

        gbc.gridx = 1;
        gbc.weightx = 1;
        panel.add(field, gbc);
    }

    private void saveContact() {
        try {
                String first = firstNameField.getText().trim();
                String last = lastNameField.getText().trim();
                String phone = phoneField.getText().trim();
                String address = addressArea.getText().trim();

                if (editingId != null) {
                    // update existing
                    service.updateContact(editingId, first, last, phone.isEmpty() ? null : phone, address);
                    JOptionPane.showMessageDialog(this, "Contact updated.", "Success", JOptionPane.INFORMATION_MESSAGE);
                    editingId = null;
                } else {
                    Contact contact = new Contact(null, first, last, phone.isEmpty() ? null : phone, address);
                    Contact savedContact = service.addContact(contact);
                    JOptionPane.showMessageDialog(this, "Contact saved successfully! Assigned ID: " + savedContact.getContactId(), "Success", JOptionPane.INFORMATION_MESSAGE);
                }

                firstNameField.setText("");
                lastNameField.setText("");
                phoneField.setText("");
                addressArea.setText("");
                firstNameField.requestFocusInWindow();

                // refresh the contacts table automatically
                refreshContacts();

        } catch (IllegalArgumentException ex) {
            JOptionPane.showMessageDialog(this, ex.getMessage(), "Input Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void clearForm() {
        firstNameField.setText("");
        lastNameField.setText("");
        phoneField.setText("");
        addressArea.setText("");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() ->
                new ContactFormApp().setVisible(true));
    }
}