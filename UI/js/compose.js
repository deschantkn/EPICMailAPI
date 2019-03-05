// Quill configuration
const container = document.getElementById('mail-editor');
const quillOptions = {
  theme: 'snow',
  placeholder: 'Start crafting your epic mail here'
};
const editor = new Quill(container, quillOptions);

const sendMail = (isDraft) => {
  // Get all input fields and prepare data for sending mail
  const to = document.getElementById('to');
  const subject = document.getElementById('subject');
  let message;
  let draft

  if (!isDraft) {
    message = editor.root.innerHTML;
  } else {
    // If draft save contents as delta so user can keep editing later
    draft = editor.getContents();
    alert(JSON.stringify(draft));
  }

  // Make api call to save email
};

