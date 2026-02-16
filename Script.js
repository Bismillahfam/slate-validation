// ===============================
// SUPABASE CONFIG
// ===============================
const SUPABASE_URL = "https://eylopwzdfmtfkvtxdpdt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bG9wd3pkZm10Zmt2dHhkcGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MzUwNTcsImV4cCI6MjA4NjMxMTA1N30.FAH1XtaQdXAmP_m3-kU8-TIe3rqSmWMZwVOYHb3PLcM";

// ===============================
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // EMAIL FORM LOGIC
  // ===============================
  const form = document.getElementById("signup-form");
  const message = document.getElementById("message");

  if (form) {
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
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ email, industry }),
        });

        if (!res.ok) {
          throw new Error(res.status.toString());
        }

        message.textContent = "You're on the list.";
        form.reset();
      } catch (error) {
        if (error.message === "409") {
          message.textContent = "You're already on the list.";
        } else {
          message.textContent = "Something went wrong. Try again later.";
          console.error(error);
        }
      }
    });
  }

  // ===============================
  // CHART.JS GRAPH
  // ===============================
  const chartCanvas = document.getElementById("reactionChart");

  if (chartCanvas && typeof Chart !== "undefined") {
    const reactionData = [
      280, 265, 250, 240, 225, 215, 205, 198, 190, 182, 175, 170, 165, 160,
    ];

    const labels = reactionData.map((_, i) => `Day ${i + 1}`);

    new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Reaction Time (ms)",
            data: reactionData,
            borderColor: "#c0c0c0",
            backgroundColor: "rgba(192,192,192,0.1)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: "#ffffff",
            },
            grid: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          y: {
            ticks: {
              color: "#ffffff",
            },
            grid: {
              color: "rgba(255,255,255,0.1)",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#ffffff",
            },
          },
        },
      },
    });
  }
});
