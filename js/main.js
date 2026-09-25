const projecten = [
  { titel: "FoodLink", omschrijving: "Een innovatieve oplossing voor SDG 2 - Zero Hunger", technieken: ["SQL", "BPMN"], link: null },
  { titel: "HotelSimulator", omschrijving: "Een Java-hotelsimulatie met een tick-gebaseerde simulatiemotor", technieken: ["Java", "JUnit", "UML"], link: "https://github.com/FilipHHS/Hotelsimulator.git" },
  { titel: "Whoami", omschrijving: "Een persoonlijke portfolio-website met HTML, CSS en JavaScript", technieken: ["HTML", "CSS", "JavaScript"], link: "https://github.com/MMesto/WPFW-opdr-1.git" },
];

function maakProjectKaart(project) {
  const kaart = document.createElement("li");
  kaart.classList.add("project-card");

  const artikel = document.createElement("article");

  const titel = document.createElement("h2");
  titel.textContent = project.titel;
  artikel.appendChild(titel);

  const omschrijving = document.createElement("p");
  omschrijving.textContent = project.omschrijving;
  artikel.appendChild(omschrijving);

  const technieken = document.createElement("p");
  technieken.classList.add("project-meta");
  technieken.textContent = "Technieken: " + project.technieken.join(", ");
  artikel.appendChild(technieken);

  if (project.link) {
    const linkAlinea = document.createElement("p");
    const link = document.createElement("a");
    link.href = project.link;
    link.textContent = "Bekijk broncode";
    linkAlinea.appendChild(link);
    artikel.appendChild(linkAlinea);
  }

  kaart.appendChild(artikel);
  return kaart;
}

function renderProjects(lijst) {
  const projectLijst = document.getElementById("projecten-lijst");
  if (!projectLijst) {
    return;
  }

  projectLijst.innerHTML = "";

  lijst.forEach((project) => {
    const kaart = maakProjectKaart(project);
    projectLijst.appendChild(kaart);
  });
}
renderProjects(projecten);
//
function filterProjecten(lijst, techniek) {
  if (techniek === "alle") {
    return lijst;
  }
  return lijst.filter((project) => project.technieken.includes(techniek));
}

function koppelFilter() {
  const keuzelijst = document.getElementById("filter-techniek");
  if (!keuzelijst) {
    return;
  }

  keuzelijst.addEventListener("change", () => {
    const gekozen = keuzelijst.value;
    const gefilterd = filterProjecten(projecten, gekozen);
    renderProjects(gefilterd);
  });
}
koppelFilter();
//
function wisselBlogInhoud(knop, inhoud) {
  const isOpen = knop.getAttribute("aria-expanded") === "true";
  inhoud.hidden = isOpen;
  knop.setAttribute("aria-expanded", String(!isOpen));
  knop.textContent = isOpen ? "Lees meer" : "Lees minder";
}

function maakUitklapKnop(inhoud) {
  const knop = document.createElement("button");
  knop.type = "button";
  knop.textContent = "Lees meer";
  knop.setAttribute("aria-expanded", "false");
  knop.addEventListener("click", () => wisselBlogInhoud(knop, inhoud));
  return knop;
}

function koppelBlogUitklappen() {
  const posts = document.querySelectorAll(".blog-list article");
  posts.forEach((post) => {
    const inhoud = post.querySelector(".blog-inhoud");
    if (!inhoud) {
      return;
    }
    inhoud.hidden = true;
    const knop = maakUitklapKnop(inhoud);
    post.insertBefore(knop, inhoud);
  });
}
koppelBlogUitklappen();
//
function valideerNaam(waarde) {
  if (waarde.trim() === "") {
    return "Vul je naam in.";
  }
  return "";
}

function valideerEmail(waarde) {
  const emailPatroon = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (waarde.trim() === "") {
    return "Vul je e-mailadres in.";
  }
  if (!emailPatroon.test(waarde)) {
    return "Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.";
  }
  return "";
}

function valideerBericht(waarde) {
  const minimaal = 10;
  if (waarde.trim().length < minimaal) {
    return `Je bericht moet minimaal ${minimaal} tekens bevatten.`;
  }
  return "";
}

function toonFout(veld, melding) {
  const foutElement = document.getElementById(`${veld.id}-fout`);
  foutElement.textContent = melding;
  veld.setAttribute("aria-invalid", melding ? "true" : "false");
}

function valideerFormulier(formulier) {
  const naam = formulier.querySelector("#naam");
  const email = formulier.querySelector("#email");
  const bericht = formulier.querySelector("#bericht");

  const fouten = [
    [naam, valideerNaam(naam.value)],
    [email, valideerEmail(email.value)],
    [bericht, valideerBericht(bericht.value)],
  ];

  fouten.forEach(([veld, melding]) => toonFout(veld, melding));

  const eersteFout = fouten.find(([, melding]) => melding !== "");
  if (eersteFout) {
    eersteFout[0].focus();
    return false;
  }
  return true;
}

function koppelContactformulier() {
  const formulier = document.getElementById("contactformulier");
  if (!formulier) {
    return;
  }

  const status = document.getElementById("formulier-status");

  formulier.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";

    if (valideerFormulier(formulier)) {
      status.textContent = "Bedankt! Je bericht is verzonden.";
      formulier.reset();
    }
  });
}
koppelContactformulier();
//