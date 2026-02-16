const SUPABASE_URL = "https://eylopwzdfmtfkvtxdpdt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bG9wd3pkZm10Zmt2dHhkcGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MzUwNTcsImV4cCI6MjA4NjMxMTA1N30.FAH1XtaQdXAmP_m3-kU8-TIe3rqSmWMZwVOYHb3PLcM";
const form = document.getElementById("signup-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const industry = document.getElementById("industry").value;

  message.textContent = "Submitting...";

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/Email_List`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, industry }),
    });

    if (!res.ok) throw new Error(res.status);

    message.textContent = "You're on the list.";
    form.reset();
  } catch (error) {
    if (error.message === "409") {
      message.textContent = "You're already on the list.";
      return;
    }
    message.textContent = "Something went wrong. Try again later." + error;
  }
});
