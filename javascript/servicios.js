const servicesData = [
    {
        title: "RAYOS X",
        icon: "fas fa-x-ray",
        image: "img/Rayos X.png",
        shortDescription: "Diagnostico por imagenes de alta calidad.",
        fullDescription: "Estudio radiologico para evaluar huesos, torax y abdomen con interpretacion profesional.",
        benefits: [
            "Resultados rapidos para apoyar decisiones clinicas.",
            "Equipo adecuado para diferentes tamanos de mascota.",
            "Protocolos de manejo seguro y cuidado del paciente."
        ]
    },
    {
        title: "ULTRASONIDOS",
        icon: "fas fa-wave-square",
        image: "img/Ultrasonidos.png",
        shortDescription: "Evaluacion interna no invasiva y precisa.",
        fullDescription: "Permite revisar organos internos, gestacion y tejidos blandos sin causar dolor.",
        benefits: [
            "Ideal para controles abdominales y reproductivos.",
            "Apoyo en diagnosticos complejos.",
            "Procedimiento rapido y seguro."
        ]
    },
    {
        title: "LABORATORIO CLINICO",
        icon: "fas fa-flask",
        image: "img/Laboratorio.png",
        shortDescription: "Analisis clinicos para diagnosticos confiables.",
        fullDescription: "Pruebas de sangre, orina y otros estudios para detectar alteraciones a tiempo.",
        benefits: [
            "Control de enfermedades cronicas.",
            "Monitoreo pre y post tratamiento.",
            "Soporte para medicina preventiva."
        ]
    },
    {
        title: "CONSULTA GENERAL",
        icon: "fas fa-stethoscope",
        image: "img/consulta.jpg",
        shortDescription: "Revision integral del estado de salud.",
        fullDescription: "Valoracion completa con orientacion preventiva y plan personalizado para cada mascota.",
        benefits: [
            "Deteccion temprana de problemas frecuentes.",
            "Recomendaciones de nutricion y rutina.",
            "Seguimiento segun edad y condicion."
        ]
    },
    {
        title: "VACUNACION Y DESPARASITACION",
        icon: "fas fa-syringe",
        image: "img/vacuna.jpg",
        shortDescription: "Proteccion preventiva adaptada a cada etapa.",
        fullDescription: "Esquemas preventivos para disminuir riesgos de enfermedades comunes y parasitos.",
        benefits: [
            "Calendario personalizado por especie y edad.",
            "Refuerzo de defensas en etapas criticas.",
            "Prevencion para mascota y familia."
        ]
    },
    {
        title: "INTERNAMIENTO",
        icon: "fas fa-bed",
        image: "img/Internamiento.png",
        shortDescription: "Monitoreo y cuidado continuo del paciente.",
        fullDescription: "Atencion durante recuperaciones y tratamientos que requieren observacion veterinaria.",
        benefits: [
            "Supervision clinica constante.",
            "Control de hidratacion y medicacion.",
            "Comunicacion con la familia sobre evolucion."
        ]
    },
    {
        title: "CIRUGIA",
        icon: "fas fa-user-md",
        image: "img/Cirugia.png",
        shortDescription: "Procedimientos quirurgicos con protocolos seguros.",
        fullDescription: "Intervenciones programadas y de necesidad medica con evaluacion previa y seguimiento posterior.",
        benefits: [
            "Preparacion preoperatoria completa.",
            "Control de dolor y recuperacion guiada.",
            "Acompanamiento postquirurgico."
        ]
    },
    {
        title: "LIMPIEZA DENTAL",
        icon: "fas fa-tooth",
        image: "img/Limpieza.png",
        shortDescription: "Salud oral para prevenir complicaciones.",
        fullDescription: "Remocion de sarro y evaluacion oral para cuidar dientes, encias y bienestar general.",
        benefits: [
            "Disminuye mal aliento y dolor oral.",
            "Previene infecciones y perdida dental.",
            "Mejora calidad de vida."
        ]
    },
    {
        title: "FARMACIA VETERINARIA",
        icon: "fas fa-pills",
        image: "img/farmacia.png",
        shortDescription: "Medicamentos y apoyo en tratamiento.",
        fullDescription: "Dispensacion y orientacion sobre uso correcto de productos veterinarios.",
        benefits: [
            "Indicaciones claras de administracion.",
            "Recomendaciones de productos de apoyo.",
            "Seguimiento de tratamientos."
        ]
    },
    {
        title: "TRANSPORTE ASISTIDO",
        icon: "fas fa-ambulance",
        image: "img/Transporte.png",
        shortDescription: "Traslado seguro para citas y controles.",
        fullDescription: "Apoyo de transporte para mascotas que requieren movilizacion con acompanamiento.",
        benefits: [
            "Opciones para pacientes con movilidad limitada.",
            "Reduccion de estres en traslados.",
            "Coordinacion segun disponibilidad."
        ]
    },
    {
        title: "ANIMALES EXOTICOS",
        icon: "fas fa-paw",
        image: "img/exoticos.png",
        shortDescription: "Atencion para especies no convencionales.",
        fullDescription: "Manejo y recomendaciones especializadas para aves, pequenos mamiferos y otras especies.",
        benefits: [
            "Evaluacion enfocada por especie.",
            "Educacion para cuidados en casa.",
            "Prevencion de riesgos frecuentes."
        ]
    },
];

function createServiceCard(service, index) {
    return `
        <article class="service-card" data-service-index="${index}">
            <div class="service-image-wrapper">
                <img src="${service.image}" alt="${service.title}" loading="lazy">
                <div class="service-overlay"></div>
            </div>
            <div class="service-content">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="service-name">${service.title}</h3>
                <p class="service-description">${service.shortDescription}</p>
                <button class="service-link service-detail-btn" type="button">
                    Ver detalle <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </article>
    `;
}

function renderServices() {
    const grid = document.getElementById("services-grid");
    if (!grid) return;
    grid.innerHTML = servicesData.map(createServiceCard).join("");
}

function openModal(service) {
    const modal = document.getElementById("service-modal");
    const title = document.getElementById("service-modal-title");
    const description = document.getElementById("service-modal-description");
    const image = document.getElementById("service-modal-image");
    const benefits = document.getElementById("service-modal-benefits");
    const contact = document.getElementById("service-modal-contact");

    if (!modal || !title || !description || !image || !benefits || !contact) return;

    title.textContent = service.title;
    description.textContent = service.fullDescription;
    image.src = service.image;
    image.alt = service.title;
    contact.href = `contacto.html?servicio=${encodeURIComponent(service.title)}`;

    benefits.innerHTML = service.benefits
        .map((item) => `<li><i class="fas fa-check-circle"></i>${item}</li>`)
        .join("");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("service-modal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function setupServiceEvents() {
    const grid = document.getElementById("services-grid");
    const closeButton = document.getElementById("service-modal-close");
    const modal = document.getElementById("service-modal");

    if (grid) {
        grid.addEventListener("click", (event) => {
            const card = event.target.closest(".service-card");
            if (!card) return;
            const index = Number(card.dataset.serviceIndex);
            const service = servicesData[index];
            if (!service) return;
            openModal(service);
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target.matches("[data-close-modal]")) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

renderServices();
setupServiceEvents();
