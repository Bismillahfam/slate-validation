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
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const graphTitleEl = document.querySelector(".graph-title");

  if (chartCanvas && typeof Chart !== "undefined") {
    const graphs = [
      {
        title: "14 Day Reaction Time Index",
        label: "Reaction Time (ms)",
        data: [
          280, 265, 250, 240, 225, 215, 205, 198, 190, 182, 175, 170, 165, 160,
        ],
      },
      {
        title: "14 Day Accuracy Index",
        label: "Accuracy (%)",
        data: [
          88, 89, 90, 91, 91.5, 92, 92.2, 92.5, 93, 93.2, 93.5, 94, 94.2, 94.5,
        ],
      },
      {
        title: "7 Day Fatigue Index",
        label: "Fatigue (score)",
        data: [6, 5.8, 5.5, 5.2, 5.0, 4.8, 4.6],
      },
    ];

    let currentIndex = 0;

    const makeLabels = (arr) => arr.map((_, i) => `${i + 1}`);

    const config = {
      type: "line",
      data: {
        labels: makeLabels(graphs[currentIndex].data),
        datasets: [
          {
            label: graphs[currentIndex].label,
            data: graphs[currentIndex].data,
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
            title: {
              display: true,
              text: "Time (Days)",
            },
            ticks: {
              color: "#ffffff",
            },
            grid: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          y: {
            title: {
              display: true,
              text: graphs[currentIndex].label,
            },
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
    };

    const reactionChart = new Chart(chartCanvas, config);

    function updateChart(index) {
      const g = graphs[index];
      reactionChart.data.labels = makeLabels(g.data);
      reactionChart.data.datasets[0].data = g.data;
      reactionChart.data.datasets[0].label = g.label;
      if (
        reactionChart.options &&
        reactionChart.options.scales &&
        reactionChart.options.scales.y &&
        reactionChart.options.scales.y.title
      ) {
        reactionChart.options.scales.y.title.text = g.label;
      }
      reactionChart.update();
      if (graphTitleEl) graphTitleEl.textContent = g.title;
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + graphs.length) % graphs.length;
        updateChart(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % graphs.length;
        updateChart(currentIndex);
      });
    }
  }
});
