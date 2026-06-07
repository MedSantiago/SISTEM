const drivePreview = "https://drive.google.com/file/d/1qpHRi5KCWfKoXFOZrXsiXh7ulFjP0ldo/preview";
    const driveView = "https://drive.google.com/file/d/1qpHRi5KCWfKoXFOZrXsiXh7ulFjP0ldo/view";

    const galleryImages = [
      {src:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80", caption:"Material visual anatómico"},
      {src:"https://images.unsplash.com/photo-1579684288402-e3e337bcc7af?auto=format&fit=crop&w=900&q=80", caption:"Apoyo visual para clase"},
      {src:"https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=900&q=80", caption:"Imagen de referencia médica"}
    ];

    const courseData = {
      programacion:{
        title:"Programación y Syllabus",
        unit:"Sist. Endocrino y Metabolismo - 20261 - S · Unit 1 of 7",
        progress:"2/2",
        files:[
          {title:"Programa del curso", type:"html", completed:true, html:"<p>Contenido del programa del curso. Aquí puedes pegar el texto real o insertar un PDF.</p>"},
          {title:"Syllabus", type:"html", completed:true, html:"<p>Contenido del syllabus. Puedes reemplazar este bloque por un iframe o por texto.</p>"}
        ]
      },
      histologia:{
        title:"Histología",
        unit:"Sist. Endocrino y Metabolismo - 20261 - S · Unit 2 of 7",
        progress:"17/17",
        files:[
          {title:"Guía - Tejido epitelial", type:"html", completed:true, html:"<p>Guía de tejido epitelial.</p>"},
          {title:"Guía - Tejido conectivo", type:"html", completed:true, html:"<p>Guía de tejido conectivo.</p>"},
          {title:"Guía - Sistema hematopoyético", type:"html", completed:true, html:"<p>Guía del sistema hematopoyético.</p>"},
          {title:"Guía - Sangre periférica", type:"html", completed:true, html:"<p>Guía de sangre periférica.</p>"},
          {title:"Videos de clase", type:"videoList", completed:true}
        ]
      },
      anatomia:{
        title:"Anatomía",
        unit:"Sist. Endocrino y Metabolismo - 20261 - S · Unit 3 of 7",
        progress:"5/5",
        files:[
          {title:"Hipotálamo-Hipófisis", type:"pdf", completed:true, previewUrl:drivePreview, viewUrl:driveView},
          {title:"Glándulas endocrinas", type:"html", completed:true, html:"<p>Material de glándulas endocrinas.</p><div class='attachment-box'>Aquí puedes colocar texto, imágenes, PDF o enlaces de esta guía.</div>"},
          {title:"Actividad: Ruta hormonal", type:"html", completed:true, html:"<h2>Actividad: Ruta hormonal</h2><p>Identificar en cada caso: concepto de la patología, nivel del eje afectado, hormonas alteradas, retroalimentación, manifestaciones clínicas y morbimortalidad.</p>"},
          {title:"Fotos anatómicas", type:"gallery", completed:true},
          {title:"Videos de clase", type:"videoList", completed:true},
          {title:"Documento adjunto PDF", type:"pdf", completed:true, previewUrl:drivePreview, viewUrl:driveView}
        ],
        centerLinks:[
          "Hipotálamo-Hipófisis",
          "Glándulas endocrinas",
          "",
          "Actividad: Ruta hormonal",
          "Fotos anatómicas",
          "Videos de clase",
          "Documento adjunto PDF"
        ]
      },
      fisiologia:{
        title:"Fisiología",
        unit:"Sist. Endocrino y Metabolismo - 20261 - S · Unit 4 of 7",
        progress:"11/11",
        files:[
          {title:"Sistema hematopoyético", type:"html", completed:true, html:"<p>Documento de Sistema hematopoyético.</p>"},
          {title:"Fisiología de la hemostasia", type:"html", completed:true, html:"<p>Documento de Fisiología de la hemostasia.</p>"},
          {title:"Hemograma", type:"html", completed:true, html:"<p>Documento de Hemograma.</p>"},
          {title:"Respuesta inmune", type:"html", completed:true, html:"<p>Documento de Respuesta inmune.</p>"},
          {title:"Videos de clase", type:"videoList", completed:true}
        ]
      }
    };

    let currentModuleId = "anatomia";
    let currentDocIndex = -1;
    const panoptoVideos = [
      {
        id:"yt-endocrino-1",
        title:"Clase 1 - Introducción al eje hipotálamo-hipófisis",
        description:"Video de apoyo adjunto para revisar el eje hormonal. Reemplaza este enlace por el video real del curso.",
        source:"https://youtu.be/-q1-C3H_XyA",
        origin:"https://youtu.be/-q1-C3H_XyA",
        platform:"YouTube"
      },
      {
        id:"yt-endocrino-2",
        title:"Clase 2 - Glándulas endocrinas",
        description:"Video adjunto de ejemplo. Puede ser YouTube, Vimeo o un video directo en formato MP4.",
        source:"https://drive.google.com/file/d/188fTHiTGduRTFrTd9pWLZLAkf7EKp197/view?usp=sharing",
        origin:"https://drive.google.com/file/d/188fTHiTGduRTFrTd9pWLZLAkf7EKp197/view?usp=sharing",
        platform:"YouTube"
      }
    ];

    document.querySelectorAll("[data-page]").forEach(el => {
      el.addEventListener("click", event => {
        event.stopPropagation();
        showPage(el.dataset.page);
      });
    });

    function showPage(id){
      document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
      const target = document.getElementById(id);
      if(target) target.classList.add("active");

      document.querySelectorAll(".nav-item[data-page]").forEach(item => {
        item.classList.toggle("active", item.dataset.page === id);
      });

      if(id === "panopto") renderVideos();
      window.scrollTo({top:0, behavior:"smooth"});
    }

    function buildModules(){
      const container = document.getElementById("modulesContainer");
      const order = ["programacion","histologia","anatomia","fisiologia"];
      container.innerHTML = order.map(id => {
        const module = courseData[id];
        return `
          <article class="module ${id === "anatomia" ? "open" : ""}" id="module-${id}">
            <div class="module-head" onclick="toggleModule('${id}')">
              <span class="triangle">▾</span>
              <span class="module-title" ondblclick="event.stopPropagation(); openModule('${id}')">${escapeHtml(module.title)}</span>
              <span class="completed">Completed ${escapeHtml(module.progress)}</span>
            </div>
            <div class="module-body">
              ${module.files.map((file, index) => fileRowHtml(file, id, index)).join("")}
              <div style="margin-top:18px">
                <button class="btn small" onclick="event.stopPropagation(); openModule('${id}')">Abrir módulo</button>
                <button class="btn small" onclick="event.stopPropagation(); showQuickAdd('${id}')">＋ Agregar archivo</button>
              </div>
            </div>
          </article>
        `;
      }).join("");
    }

    function getIconClass(type){
      if(type === "videoList" || type === "video") return "video-icon";
      if(type === "gallery" || type === "image") return "image-icon";
      if(type === "html") return "text-icon";
      return "doc-icon";
    }

    function fileRowHtml(file, moduleId, index){
      const icon = getIconClass(file.type);
      const iconHtml = icon === "text-icon" ? `<span class="${icon}">T</span>` : `<span class="${icon}"></span>`;
      return `
        <div class="file-row" onclick="openDoc('${moduleId}', ${index})">
          ${iconHtml}
          <span>${escapeHtml(file.title)}</span>
          <span class="check">${file.completed ? "✓" : ""}</span>
        </div>
      `;
    }

    function toggleModule(id){
      document.getElementById(`module-${id}`).classList.toggle("open");
    }

    function openModule(id){
      currentModuleId = id;
      currentDocIndex = -1;
      fillLesson(id);
      showLessonIndex();
      showPage("lessonView");
    }

    function fillLesson(id){
      const module = courseData[id];

      document.getElementById("sideCourse").textContent = module.unit;
      document.getElementById("sideModuleTitle").textContent = module.title;
      document.getElementById("sideProgress").textContent = module.progress;
      document.getElementById("viewerTitle").textContent = module.title;
      document.getElementById("lessonMainTitle").textContent = module.title;

      document.getElementById("sideFiles").innerHTML = module.files.map((file, index) => {
        const icon = getIconClass(file.type);
        const iconHtml = icon === "text-icon" ? `<span class="${icon}">T</span>` : `<span class="${icon}"></span>`;
        const active = index === currentDocIndex ? "active-file" : "";
        return `
          <div class="file-row ${active}" onclick="openDoc('${id}', ${index})">
            ${iconHtml}
            <span>${escapeHtml(file.title)}</span>
            <span class="check">${file.completed ? "✓" : ""}</span>
          </div>
        `;
      }).join("");

      const links = module.centerLinks || module.files.map(file => file.title);
      document.getElementById("centerLinks").innerHTML = links.map(link => {
        if(link === "") return `<div class="spacer"></div>`;
        const index = findFileIndexByLink(module, link);
        if(index >= 0) return `<a onclick="openDoc('${id}', ${index})">${escapeHtml(link)}</a>`;
        if(normalize(link).includes("videos")) return `<a onclick="openVideoListFromModule('${id}')">${escapeHtml(link)}</a>`;
        return `<a onclick="openVirtualContent('${id}', '${escapeAttr(link)}')">${escapeHtml(link)}</a>`;
      }).join("");

      document.getElementById("moduleOverview").innerHTML = id === "anatomia" ? anatomyOverviewHtml() : defaultOverviewHtml(id);
    }

    function anatomyOverviewHtml(){
      return `
        <section class="overview-section activity-box">
          <h3>Actividad: Ruta hormonal</h3>
          <p>Identificar en cada caso:</p>
          <ul>
            <li>Concepto de la patología</li>
            <li>Nivel del eje afectado: hipotálamo, hipófisis o glándula</li>
            <li>Hormona hipotalámica alterada alta o baja</li>
            <li>Hormona hipofisaria alterada alta o baja</li>
            <li>Glándula diana hormonal alterada alta o baja</li>
            <li>Graficar el tipo de retroalimentación</li>
            <li>Manifestaciones clínicas</li>
            <li>Morbimortalidad nacional o internacional</li>
          </ul>
          <p><b>Actividad:</b></p>
          <ul>
            <li>Realizar una infografía explicando los pasos anteriores y el porqué de las interacciones.</li>
            <li>Incluir imágenes que apoyen el texto.</li>
            <li>Indicar los integrantes del grupo.</li>
            <li>Agregar mínimo tres referencias en formato Vancouver.</li>
            <li>Un solo estudiante sube el trabajo a la plataforma.</li>
          </ul>
        </section>

        <section class="overview-section">
          <h2>Materiales del módulo</h2>
          <div class="material-grid">
            <div class="material-card" onclick="openDoc('anatomia',0)">
              <span class="doc-icon"></span>
              <strong>PDF</strong>
              <p>Vista previa de documentos directamente dentro de la plataforma.</p>
            </div>
            <div class="material-card" onclick="openDoc('anatomia',3)">
              <span class="image-icon"></span>
              <strong>Fotos</strong>
              <p>Galería de imágenes anatómicas y material visual.</p>
            </div>
            <div class="material-card" onclick="openDoc('anatomia',4)">
              <span class="video-icon"></span>
              <strong>Videos</strong>
              <p>Videos adjuntos desde Panopto o por enlace externo.</p>
            </div>
          </div>
        </section>

        <section class="overview-section">
          <h2>Fotos del tema</h2>
          <div class="gallery">
            ${galleryImages.map(image => `
              <figure>
                <img src="${escapeAttr(image.src)}" alt="${escapeAttr(image.caption)}">
                <figcaption>${escapeHtml(image.caption)}</figcaption>
              </figure>
            `).join("")}
          </div>
        </section>

        <section class="overview-section">
          <h2>Videos de clase</h2>
          <div class="inline-video-grid">
            <div class="video-placeholder" onclick="openDoc('anatomia',4)">▶ Ver videos adjuntos en Panopto</div>
            <div class="video-placeholder" onclick="showPage('panopto')">＋ Adjuntar video desde Panopto</div>
          </div>
        </section>
      `;
    }

    function defaultOverviewHtml(id){
      return `
        <section class="overview-section">
          <h2>Materiales disponibles</h2>
          <div class="material-grid">
            <div class="material-card"><span class="doc-icon"></span><strong>Documentos</strong><p>Selecciona un archivo de la lista izquierda.</p></div>
            <div class="material-card"><span class="video-icon"></span><strong>Videos</strong><p>Se pueden conectar con Panopto.</p></div>
            <div class="material-card"><span class="image-icon"></span><strong>Imágenes</strong><p>Espacio para fotos o esquemas.</p></div>
          </div>
        </section>
      `;
    }

    function findFileIndexByLink(module, link){
      const normalizedLink = normalize(link);
      return module.files.findIndex(file => {
        const fileTitle = normalize(file.title);
        return fileTitle.includes(normalizedLink) || normalizedLink.includes(fileTitle.replace("guia - ",""));
      });
    }

    function openDoc(moduleId, index){
      currentModuleId = moduleId;
      currentDocIndex = index;
      fillLesson(moduleId);
      const file = courseData[moduleId].files[index];
      renderDocument(file);
      showPage("lessonView");
    }

    function openVirtualContent(moduleId, title){
      currentModuleId = moduleId;
      currentDocIndex = -1;
      fillLesson(moduleId);
      renderDocument({
        title,
        type:"html",
        completed:true,
        html:`<p><b>${escapeHtml(title)}</b></p><div class="attachment-box">Este enlace aparece en el índice central del módulo. Puedes conectarlo con un PDF, imagen, video o texto real desde el objeto <code>courseData</code>.</div>`
      });
      showPage("lessonView");
    }

    function openVideoListFromModule(moduleId){
      const index = courseData[moduleId].files.findIndex(file => file.type === "videoList");
      if(index >= 0) openDoc(moduleId, index);
      else showPage("panopto");
    }

    function renderDocument(file){
      document.getElementById("lessonIndex").style.display = "none";
      document.getElementById("docReader").classList.add("active");
      document.getElementById("docTitle").textContent = file.title;
      document.getElementById("viewerTitle").textContent = file.title;

      let html = "";

      if(file.type === "pdf"){
        html = `
          <div class="preview-actions">
            <p><b>Vista previa del PDF:</b> ${escapeHtml(file.title)}</p>
            <a href="${escapeAttr(file.viewUrl || file.previewUrl)}" target="_blank" rel="noopener">Abrir en Google Drive</a>
          </div>
          <iframe class="preview-frame" src="${escapeAttr(file.previewUrl)}" allow="autoplay"></iframe>
          <p class="muted">Si no carga, revisa que el archivo de Drive esté en “Cualquier persona con el enlace puede ver”.</p>
        `;
      } else if(file.type === "gallery"){
        html = `
          <h2>Fotos anatómicas</h2>
          <p class="muted">Aquí puedes poner imágenes de apuntes, esquemas, capturas o material de clase.</p>
          <div class="gallery">
            ${galleryImages.map(image => `
              <figure>
                <img src="${escapeAttr(image.src)}" alt="${escapeAttr(image.caption)}">
                <figcaption>${escapeHtml(image.caption)}</figcaption>
              </figure>
            `).join("")}
          </div>
          <div class="attachment-box">
            Para colocar tus propias imágenes, reemplaza las URL dentro de <code>galleryImages</code> por tus archivos o enlaces.
          </div>
        `;
      } else if(file.type === "videoList"){
        html = `
          <p>Videos adjuntos del curso. Puedes verlos aquí o abrirlos en su página original con la flecha ↗.</p>
          <div id="embeddedVideoList"></div>
          <p><button class="btn primary" onclick="showPage('panopto')">Ver en Panopto</button></p>
        `;
      } else if(file.type === "video"){
        html = `
          <video class="content-video" controls preload="metadata">
            <source src="${escapeAttr(file.url)}">
            Tu navegador no puede reproducir este video.
          </video>
        `;
      } else if(file.type === "link"){
        html = `
          <p><b>Enlace externo:</b></p>
          <p><a href="${escapeAttr(file.url)}" target="_blank" rel="noopener">${escapeHtml(file.url)}</a></p>
        `;
      } else {
        html = file.html || `
          <div class="empty-preview">
            <div>
              <h3>Contenido pendiente</h3>
              <p>Este archivo todavía no tiene vista previa configurada.</p>
            </div>
          </div>
        `;
      }

      document.getElementById("docContent").innerHTML = html;

      if(file.type === "videoList"){
        renderEmbeddedVideos();
      }
    }

    function renderEmbeddedVideos(){
      const holder = document.getElementById("embeddedVideoList");
      if(!holder) return;

      if(panoptoVideos.length === 0){
        holder.innerHTML = `
          <div class="empty-preview">
            <div>
              <h3>No hay videos adjuntos todavía</h3>
              <p>Agrega enlaces dentro del arreglo <b>panoptoVideos</b> del código.</p>
            </div>
          </div>
        `;
        return;
      }

      holder.innerHTML = `
        <div class="video-viewer-grid">
          ${panoptoVideos.map(video => `
            <article class="panopto-video-card">
              ${buildVideoPlayer(video)}
              <div class="panopto-card-body">
                <div>
                  <h3>${escapeHtml(video.title)}</h3>
                  <p><b>Origen:</b> ${escapeHtml(video.platform || "Video externo")}</p>
                  <p>${escapeHtml(video.description || "")}</p>
                </div>
                <a class="origin-button" href="${escapeAttr(video.origin || video.source)}" target="_blank" rel="noopener" title="Abrir video en la página original">↗</a>
              </div>
            </article>
          `).join("")}
        </div>
      `;
    }

    function showLessonIndex(){
      document.getElementById("docReader").classList.remove("active");
      document.getElementById("lessonIndex").style.display = "block";
      document.getElementById("viewerTitle").textContent = courseData[currentModuleId].title;
      currentDocIndex = -1;
      fillLesson(currentModuleId);
    }

    function previousDoc(){
      const files = courseData[currentModuleId].files;
      if(files.length === 0) return;
      currentDocIndex = currentDocIndex <= 0 ? files.length - 1 : currentDocIndex - 1;
      openDoc(currentModuleId, currentDocIndex);
    }

    function nextDoc(){
      const files = courseData[currentModuleId].files;
      if(files.length === 0) return;
      currentDocIndex = currentDocIndex < 0 || currentDocIndex >= files.length - 1 ? 0 : currentDocIndex + 1;
      openDoc(currentModuleId, currentDocIndex);
    }

    function showQuickAdd(moduleId){
      const type = prompt("Tipo de archivo: pdf, link, html, gallery o videoList", "pdf");
      if(!type) return;

      const title = prompt("Título del archivo", "Nuevo documento");
      if(!title) return;

      if(type === "pdf"){
        const url = prompt("Pega la URL de Google Drive en formato /preview", "https://drive.google.com/file/d/ID_DEL_ARCHIVO/preview");
        if(!url) return;
        courseData[moduleId].files.push({title, type:"pdf", completed:false, previewUrl:url, viewUrl:url.replace("/preview","/view")});
      } else if(type === "link"){
        const url = prompt("Pega la URL del enlace");
        if(!url) return;
        courseData[moduleId].files.push({title, type:"link", completed:false, url});
      } else if(type === "videoList"){
        courseData[moduleId].files.push({title, type:"videoList", completed:false});
      } else if(type === "gallery"){
        courseData[moduleId].files.push({title, type:"gallery", completed:false});
      } else {
        const content = prompt("Texto HTML básico del contenido", "<p>Contenido del documento.</p>");
        courseData[moduleId].files.push({title, type:"html", completed:false, html:content || "<p>Contenido del documento.</p>"});
      }

      buildModules();
      openModule(moduleId);
      notify("Archivo agregado al módulo. En esta maqueta se guarda mientras la página está abierta.");
    }

    function addLocalVideos(){
      const input = document.getElementById("videoFiles");
      const files = Array.from(input.files);

      if(files.length === 0){
        alert("Primero selecciona uno o varios videos.");
        return;
      }

      files.forEach(file => {
        panoptoVideos.unshift({
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
          title: file.name.replace(/\.[^/.]+$/, ""),
          source: URL.createObjectURL(file),
          type: "Archivo adjunto",
          size: formatBytes(file.size),
          date: new Date().toLocaleString("es-CO")
        });
      });

      input.value = "";
      renderVideos();
      notify("Video adjuntado en Panopto.");
    }

    function addVideoUrl(){
      const title = document.getElementById("videoTitle").value.trim() || "Video sin título";
      const url = document.getElementById("videoUrl").value.trim();

      if(!url){
        alert("Pega la URL del video.");
        return;
      }

      panoptoVideos.unshift({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
        title,
        source:url,
        type:"Enlace externo",
        size:"URL",
        date:new Date().toLocaleString("es-CO")
      });

      document.getElementById("videoTitle").value = "";
      document.getElementById("videoUrl").value = "";
      renderVideos();
      notify("Video agregado por enlace.");
    }

    function renderVideos(){
      const list = document.getElementById("videoList");
      if(!list) return;

      const query = document.getElementById("videoSearch")?.value.toLowerCase().trim() || "";
      const filtered = panoptoVideos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        (video.description || "").toLowerCase().includes(query) ||
        (video.platform || "").toLowerCase().includes(query)
      );

      if(filtered.length === 0){
        list.innerHTML = `
          <div class="empty">
            <h3>No hay videos para esa búsqueda</h3>
            <p>Los videos se configuran en el arreglo <b>panoptoVideos</b> del código.</p>
          </div>
        `;
        return;
      }

      list.innerHTML = filtered.map(video => {
        const player = buildVideoPlayer(video);
        return `
          <article class="panopto-video-card">
            ${player}
            <div class="panopto-card-body">
              <div>
                <h3>${escapeHtml(video.title)}</h3>
                <p><b>Origen:</b> ${escapeHtml(video.platform || "Video externo")}</p>
                <p>${escapeHtml(video.description || "")}</p>
              </div>
              <a class="origin-button" href="${escapeAttr(video.origin || video.source)}" target="_blank" rel="noopener" title="Abrir video en la página original">↗</a>
            </div>
          </article>
        `;
      }).join("");
    }

    function buildVideoPlayer(video){
      const src = video.source || "";
      const lower = src.toLowerCase();

      if(lower.includes("youtube.com/embed") || lower.includes("player.vimeo.com")){
        return `<iframe class="panopto-player" src="${escapeAttr(src)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      }

      if(lower.includes("youtube.com/watch") || lower.includes("youtu.be/")){
        const converted = convertYoutubeToEmbed(src);
        return `<iframe class="panopto-player" src="${escapeAttr(converted)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      }

      return `
        <video class="panopto-player" controls preload="metadata">
          <source src="${escapeAttr(src)}">
          Tu navegador no puede reproducir este video.
        </video>
      `;
    }

    function convertYoutubeToEmbed(url){
      try{
        const clean = new URL(url);
        let id = "";

        if(clean.hostname.includes("youtu.be")){
          id = clean.pathname.replace("/", "");
        } else {
          id = clean.searchParams.get("v") || "";
        }

        return id ? `https://www.youtube.com/embed/${id}` : url;
      } catch(error){
        return url;
      }
    }

    function deleteVideo(id){
      const index = panoptoVideos.findIndex(video => video.id === id);
      if(index >= 0){
        if(panoptoVideos[index].type === "Archivo adjunto"){
          URL.revokeObjectURL(panoptoVideos[index].source);
        }
        panoptoVideos.splice(index,1);
        renderVideos();
        notify("Video eliminado.");
      }
    }

    function notify(message){
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.classList.add("show");
      clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
    }

    function formatBytes(bytes){
      if(bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes","KB","MB","GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k,i)).toFixed(2))} ${sizes[i]}`;
    }

    function normalize(text){
      return String(text).toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .replace(/guia/g,"guia")
        .replace(/perine/g,"perine")
        .trim();
    }

    function escapeHtml(text){
      return String(text)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
    }

    function escapeAttr(text){
      return escapeHtml(text).replaceAll("\n"," ");
    }

    buildModules();
    renderVideos();
