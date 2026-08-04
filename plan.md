1. Resumen ejecutivo
Este documento define la construcción completa de un nuevo sitio web para Florida Fiberglass Pools, partiendo del sitio actual (flfgpools.com) como base conceptual y de contenido, pero reconstruido en su totalidad. No es un retoque del WordPress existente: es una arquitectura nueva, con un sistema de diseño propio, jerarquía de información replanteada y una base técnica orientada al posicionamiento orgánico.
La lectura de diseño que guía todo el documento es la siguiente:
Design Read
Rediseño tipo overhaul de un negocio físico local de piscinas de fibra de vidrio en el sur de Florida, para una audiencia mixta (propietarios hispano y angloparlantes, contractors, realtors e inversionistas), con un lenguaje premium-minimalista de alto impacto en el home y tono más calmo en el resto, apoyado en una aproximación web de liquid glass y Motion con moderación.

Se conservan con total fidelidad los textos, datos y la propuesta de negocio actual: el showroom de más de 6,000 sqft, la trayectoria desde 2013, las certificaciones (ICC/ES, PHTA), el catálogo de modelos, el financiamiento con Hearth y la atención en español, inglés y portugués. Sobre esa base se corrigen los problemas detectados en la auditoría previa y se añaden las páginas solicitadas.
1.1 Qué incluye este plan
•	Diseño: dirección visual completa, paleta, tipografía, sistema de componentes y tratamiento de movimiento.
•	Estructura: arquitectura de las 7 secciones solicitadas (Home, About, Projects, Products, Contact, FAQs, Privacy) más el módulo interactivo Create by Yourself.
•	SEO: estrategia técnica y de contenido orientada a posicionamiento local en el sur de Florida, incluyendo datos estructurados, metadatos y arquitectura bilingüe.
•	Copy: textos definitivos por sección, fieles al original y depurados de las inconsistencias actuales...

1.2 Problemas del sitio actual que este plan resuelve
Problema actual	Cómo se resuelve en el sitio nuevo
Datos inconsistentes (+600 vs +1000 piscinas en la misma web)	Una sola cifra verificada, usada de forma consistente en todo el sitio y en los datos estructurados.
Imágenes que no cargan (placeholder SVG visible)	Pipeline de imágenes optimizado, formatos modernos y carga diferida correcta con respaldo visible.
Copy genérico sin diferenciación	Mensaje central anclado en la ventaja física: el mayor showroom de fibra de vidrio del sur de Florida.
Sin contenido educativo para el comprador	Páginas y bloques que responden las dudas reales antes de la cotización.
SEO limitado a Miami	Arquitectura de páginas locales por ciudad y contenido bilingüe español-inglés.
Sin testimonios visibles	Prueba social integrada en home, projects y fichas de producto.
 
2. Dirección de diseño
El objetivo es un sitio que se sienta premium y sereno, donde el agua y la luz son los protagonistas. El home concentra el impacto visual; las páginas internas bajan la intensidad para favorecer la lectura y la conversión, manteniendo el mismo lenguaje.
2.1 Los tres diales del proyecto
Siguiendo el marco de diseño aplicado, el proyecto se calibra así (escala 1 a 10):
Dial	Valor	Qué significa en este proyecto
Variación de diseño	7	Composiciones asimétricas y con personalidad en el home, controladas en las internas. Ni rígido ni caótico.
Intensidad de movimiento	5	Movimiento motivado: entrada del hero, revelado al hacer scroll, física sutil en botones. Nunca animación decorativa por defecto.
Densidad visual	3	Aire generoso, estilo galería. El producto y las fotos respiran.
Lectura: home de impacto premium-consumer; internas calmadas y legibles. El movimiento existe, pero siempre comunica jerarquía, secuencia o respuesta a una acción.
2.2 Paleta de color
La paleta abandona el azul plano del sitio actual y construye una gama más rica y premium alrededor del agua: un azul profundo casi nocturno como base, un cian luminoso como acento, y neutros cálidos de arena para equilibrar. Esto da contraste, profundidad y una sensación de calma costera.
Rol	Hex	Uso
Deep Ocean (base)	#06283D	Fondos oscuros del hero, footer, secciones de inmersión.
Marine Navy	#0A2540	Texto sobre claro, encabezados, navegación.
Aqua Glow (acento)	#1FB6D4	Botones primarios, enlaces, detalles de luz, bordes de vidrio.
Lagoon Mist	#7FD8E8	Acentos suaves, hover, estados secundarios.
Sand Warm (neutro)	#F3EEE7	Fondos cálidos de secciones internas, descanso visual.
Cloud (superficie)	#FBFDFE	Fondo base de páginas internas, tarjetas.
Slate Ink (texto)	#1A2332	Cuerpo de texto, máxima legibilidad.
Muted Slate	#5A6472	Texto secundario, descripciones, leyendas.
Por qué funciona
Un color dominante (el azul profundo) con un acento de luz nítido (el cian) supera siempre a una paleta tímida y repartida. Los neutros de arena evitan que el sitio se sienta frío o clínico, y refuerzan la idea de patio, sol y descanso — que es justamente lo que vende una piscina.
2.3 Tipografía
Se evita por completo el conjunto de fuentes genéricas. La propuesta empareja una tipografía display con carácter para los titulares con una sans-serif de cuerpo limpia y altamente legible.
Rol	Propuesta	Carácter
Display / titulares	Fraunces o Clash Display	Elegante, con personalidad editorial. Da el toque premium en el hero y los encabezados de sección.
Cuerpo / interfaz	General Sans o Satoshi	Neutra, moderna, muy legible en párrafos largos y formularios.
Datos / números	Variante tabular de la sans	Cifras alineadas para precios, dimensiones y especificaciones del catálogo.
Regla de implementación: las fuentes se autoalojan con font-display: swap. Nunca se enlazan vía Google Fonts en producción, por rendimiento y privacidad.
2.4 Liquid glass: aproximación honesta
El estilo “liquid glass” solicitado se implementa como una aproximación web de vidrio esmererilado (frosted glass), no como el material nativo de Apple, que no existe como paquete CSS para web. Se reserva para los momentos correctos: la barra de navegación flotante, las tarjetas del catálogo sobre fotografía, los overlays del configurador y los controles del hero.
•	Técnica: backdrop-filter con desenfoque y saturación, sobre fondos translúcidos.
•	Detalle físico: borde interior de 1px claro y sombra interior sutil para simular la refracción del canto del vidrio.
•	Accesibilidad: respaldo de relleno sólido bajo prefers-reduced-transparency, para accesibilidad y contraste garantizado.
Dónde sí y dónde no
El vidrio se usa donde hay algo detrás que merezca verse difuminado (foto de piscina, video del hero). No se aplica a todo — un sitio con glassmorphism en cada tarjeta se ve barato. La regla es: si no hay profundidad detrás, es una superficie sólida.
2.5 Movimiento (Motion)
El movimiento se construye con la librería Motion y responde siempre a una intención comunicativa. Cada animación debe poder justificarse en una frase; si no, se elimina.
Momento	Animación y propósito
Carga del hero	Entrada escalonada del titular, subtítulo y CTA. Comunica jerarquía y da la primera impresión premium.
Scroll en secciones	Revelado suave de bloques al entrar en viewport (whileInView, una sola vez). Acompaña la narrativa de la página.
Hover en CTAs y tarjetas	Física de resorte sutil (spring), nunca easing lineal. Da respuesta táctil a la interacción.
Configurador Create by Yourself	Transiciones de estado entre opciones (color, forma, tamaño). Muestra que algo cambió.
Galería de Projects	Transición compartida entre miniatura y vista ampliada (layoutId). Da continuidad espacial.
Respeto por el usuario
Todo el movimiento se envuelve en prefers-reduced-motion. Quien tenga activada la reducción de movimiento ve una versión estática y limpia, sin perder contenido. El movimiento es un realce, nunca un requisito para usar el sitio.
 
3. Arquitectura del sitio
El sitio mantiene la estructura mental del actual — el usuario reconoce dónde está todo — pero reorganiza la jerarquía para llevar mejor al visitante desde el descubrimiento hasta la cotización. La navegación principal queda así:
Sección	Propósito
Home	Impacto, propuesta de valor, accesos rápidos a todo. La página de mayor peso visual.
About	Historia, showroom, certificaciones y equipo. Construye confianza.
Projects	Galería de fotos y videos del showroom y de instalaciones reales.
Products	Catálogo completo de modelos con filtros, colores y especificaciones.
Create by Yourself	Configurador interactivo para diseñar y cotizar la piscina.
FAQs	Respuestas a las dudas reales del comprador. Pieza clave de SEO.
Contact	Formulario, showroom, mapa, horarios y canales directos.
Privacy	Política de privacidad y tratamiento de datos.
La barra de navegación usa el tratamiento de vidrio flotante, se contrae al hacer scroll y mantiene siempre visible el CTA principal y el selector de idioma (ES / EN).
 
3.1 Home
El home es la única página con intensidad visual alta. Su trabajo es transmitir, en los primeros segundos, que esta es una empresa seria, con presencia física real y un producto premium. Se estructura en bloques que descienden en intensidad.
Estructura de bloques
1.	Hero inmersivo. Video o imagen de gran formato de una piscina terminada, con overlay de vidrio. Titular fiel a la marca, subtítulo y dos CTAs: “Ver catálogo” y “Diseña la tuya”.
2.	Franja de confianza. Las cifras verificadas del negocio (años desde 2013, piscinas instaladas, tamaño del showroom, estilos disponibles), presentadas como contadores sobrios.
3.	La ventaja del showroom. Bloque dedicado al diferenciador central: el mayor showroom de fibra de vidrio del sur de Florida, con foto real y CTA para agendar visita.
4.	Por qué fibra de vidrio. Tres a cuatro beneficios clave (durabilidad, baja mantención, instalación rápida, superficie no porosa), con iconografía propia y movimiento de revelado.
5.	Catálogo destacado. Carrusel o grilla de modelos seleccionados, con tarjetas de vidrio sobre foto, que enlazan a Products.
6.	Create by Yourself (teaser). Invitación al configurador, mostrando una vista previa del diseñador interactivo.
7.	Financiamiento. Bloque del programa con Hearth: “Tú lo sueñas, nosotros lo financiamos”, con el aviso de que consultar opciones no afecta el puntaje de crédito.
8.	Prueba social. Testimonios reales de clientes con nombre y ciudad, integrados con tipografía editorial.
9.	Cierre y contacto. Formulario corto de cotización con segmentación (propietario, contractor, realtor, inversionista) y los canales directos.

Copy fiel del hero
Titular propuesto (manteniendo el espíritu original)
Your dream pool, built to last. — Developed with the best design, focused on safety and fun. The ideal fiberglass pool for your home, ready to bring years of enjoyment to your family.
Se conserva la esencia del texto actual (“Your dream pool”), pero el subtítulo se reescribe para que fluya y deje de sonar a plantilla. La versión en español se traduce con registro natural, no literal.
 
3.2 About
La página About baja la intensidad y se vuelve narrativa. Su función es convertir la trayectoria en confianza. Conserva íntegro el texto institucional actual y lo organiza mejor.
Bloques
•	Intro: encabezado calmo con una foto del showroom o del equipo.
•	Historia: el texto actual íntegro — más de 6,000 sqft, el mayor showroom del sur de Florida, más de 120 piscinas exhibidas, presencia desde 2013, compromiso con la calidad y el acompañamiento de principio a fin.
•	Trayectoria: línea de tiempo desde 2013 hasta hoy, con hitos del negocio.
•	Certificaciones: las certificaciones (ICC/ES, PHTA) presentadas como argumento, no solo como logos: qué significan y por qué importan para los permisos en Florida.
•	Equipo e idiomas: breve presentación del equipo y la atención en español, inglés y portugués.
•	CTA: invitación a visitar el showroom o solicitar una cotización.
Corrección importante
Aquí se unifica de una vez la cifra de piscinas. Se elige un solo número verificable (el real del negocio) y se usa en About, Home, datos estructurados y materiales. Desaparece la contradicción entre “+600” y “+1000” que hoy resta credibilidad.
 
3.3 Projects — showroom en imágenes y video
Esta es la página donde la ventaja física se vuelve visible. Reemplaza al Projects genérico actual por una galería rica del showroom y de instalaciones reales, en foto y video. Es contenido que ningún fabricante nacional puede mostrar, porque no tiene presencia física local.
Estructura
•	Hero de video: video tour del showroom de 6,000 sqft como pieza central, en formato de gran formato con controles de vidrio.
•	Galería: galería filtrable de proyectos por tipo (residencial, spa, tanning ledge) y por zona del sur de Florida.
•	Ficha de proyecto: cada proyecto abre en vista ampliada con transición compartida, mostrando antes/después, modelo usado, color y ubicación general.
•	Video de instalación: sección de videos cortos de instalaciones reales, de principio a fin, reutilizables en redes.
•	Prueba social: testimonio del cliente asociado a cada proyecto cuando exista.
Tratamiento de medios: las imágenes se sirven en formatos modernos, con tamaños responsivos y carga diferida correcta. Los videos usan póster e inician bajo demanda para no penalizar el rendimiento ni el SEO.
Valor SEO de esta página
Las fotos reales de instalaciones en ciudades concretas (Miami, Hialeah, Coral Gables, Kendall) con texto alternativo descriptivo y ubicación alimentan el posicionamiento local. Google premia la evidencia de trabajo real en una zona, algo que el contenido genérico no puede igualar.
 
3.4 Products — catálogo actualizado
El catálogo conserva la estructura del actual (modelos R1 a R19, filtros y colores) pero con un sistema de fichas premium y una experiencia de filtrado fluida. Se mantiene fiel a la información real del sitio.
Filtros (idénticos al actual, mejor presentados)
Filtro	Opciones
Tamaño	Hasta 16 ft  ·  16 ft – 22 ft  ·  22 ft o más
Tipo	Pool  ·  Spa  ·  Tanning Ledge
Color disponible	Caribbean Blue · Sky Blue · Bahama Blue · Diamond Grey · White Ivory

Ficha de producto
Cada modelo (R1, R2, ... R19) tiene su propia página con:
•	Visual: render o foto del modelo, con selector de color que actualiza la vista.
•	Especificaciones: dimensiones, tipo y características, en tipografía tabular.
•	Descripción: texto introductorio fiel al actual sobre las ventajas de la fibra de vidrio.
•	CTA de cotización: botón para llevar este modelo al configurador Create by Yourself y cotizar.
•	Sugerencias: modelos relacionados por tamaño o tipo.
Texto de catálogo conservado
Se mantiene la descripción real del sitio: una piscina de fibra de vidrio es altamente durable, requiere menos mantenimiento que las tradicionales, tiene mayor vida útil, viene en variedad de formas y tamaños, es personalizable y suele instalarse en pocas semanas.
Las fichas de producto se marcan con datos estructurados de tipo producto para que aparezcan enriquecidas en los resultados de búsqueda.
 
3.5 Create by Yourself — configurador y cotización
Es la pieza nueva más ambiciosa del sitio: un configurador donde el usuario diseña su piscina paso a paso y, al final, entrega los datos clave para cotización y construcción. Funciona como módulo destacado en el home y como página propia. Convierte una visita pasiva en un lead cualificado con intención de compra.
Flujo del configurador
1.	Elige el tipo: piscina, spa o tanning ledge.
2.	Elige el tamaño: hasta 16 ft, 16–22 ft, o 22 ft o más.
3.	Elige el modelo base (R1–R19) compatible con lo anterior, con vista previa.
4.	Elige el color de acabado entre los cinco disponibles; la vista previa se actualiza en vivo.
5.	Añade extras: spa integrado, iluminación LED, calefacción, deck o área de patio.
6.	Indica datos del sitio: ciudad, tipo de acceso al patio y plazo deseado.
7.	Deja sus datos de contacto y recibe un estimado orientativo y el contacto del equipo.

Datos clave que captura para cotización y construcción
Dato	Para qué sirve
Tipo, modelo y tamaño	Define el producto base y el rango de precio.
Color y extras	Ajusta el estimado y la configuración final.
Ciudad / ZIP	Permite asignar zona de servicio y estimar permisos locales.
Tipo de acceso al patio	Factor crítico de costo de instalación (entrada de grúa, espacio).
Plazo deseado	Prioriza el lead y planifica el calendario de instalación.
Segmento (propietario/contractor/realtor/inversionista)	Enruta el lead al flujo comercial correcto.
Contacto (nombre, teléfono, email)	Permite el seguimiento. Compromiso de respuesta en menos de 24 horas.
Experiencia y diseño
El configurador usa overlays de vidrio y transiciones de estado con Motion para que cada elección se sienta tangible. La vista previa de la piscina cambia de color y forma en vivo. En móvil se convierte en un flujo de pasos a pantalla completa. Todo el estado del configurador vive en motion values, no en re-render por cada cambio, para que sea fluido incluso en teléfonos.
Importante: el estimado se presenta siempre como orientativo. El precio final lo confirma el equipo tras evaluar el sitio. Esto evita falsas expectativas y protege la conversación comercial.
 
3.6 FAQs
Las preguntas frecuentes cumplen doble función: resuelven las dudas reales del comprador y son una de las piezas más potentes de SEO, porque capturan búsquedas en lenguaje natural. Se marcan con datos estructurados de tipo FAQ para optar a resultados enriquecidos.
Bloques temáticos sugeridos
•	Proceso e instalación: cuánto tiempo toma la instalación, qué incluye, cómo es el proceso de principio a fin.
•	Costos y financiamiento: rango de precios en el sur de Florida, qué factores afectan el costo, opciones de financiamiento con Hearth.
•	Producto: durabilidad, mantenimiento, superficie no porosa, comparación con concreto y vinil.
•	Permisos y zona: permisos en Miami-Dade, Broward y Palm Beach, requisitos de patio, acceso.
•	Garantía y soporte: garantías, certificaciones, qué pasa después de la instalación.
Ejemplos de preguntas con alto valor de búsqueda
¿Cuánto cuesta una piscina de fibra de vidrio en Miami? · ¿Cuánto tarda la instalación? · ¿Fibra de vidrio o concreto en Florida? · ¿Necesito permiso para una piscina en Miami-Dade? · ¿Ofrecen financiamiento? Cada respuesta se redacta de forma clara y útil, en español e inglés.
 
3.7 Contact
La página de contacto conserva y mejora todos los canales actuales. Su diseño es calmo y directo, pensado para convertir.
Elementos
•	Formulario: formulario con segmentación por tipo de cliente (propietario, contractor, realtor, inversionista) y campos de nombre, teléfono, email, ZIP y mensaje.
•	Promesa de respuesta: compromiso visible de respuesta en menos de 24 horas, para reducir el abandono.
•	Showroom: dirección del showroom (21500 S Dixie Hwy, Miami, FL) con mapa embebido.
•	Canales directos: teléfono +1 786-207-1634, correo sales@flfgpools.com y enlace directo de WhatsApp.
•	Horarios: horario — lunes a viernes 9am a 5pm, sábado 9am a 1pm, domingo cerrado.
•	Idiomas: indicación de atención en español, inglés y portugués.
La dirección, el teléfono y el horario se marcan con datos estructurados de negocio local para reforzar el SEO en mapas.

3.8 Privacy
Página de política de privacidad, necesaria por cumplimiento y por confianza, especialmente al capturar datos en el configurador y los formularios.
•	Datos recogidos: qué datos se recogen (contacto, datos del configurador, navegación).
•	Uso: para qué se usan (cotización, seguimiento comercial, mejora del sitio).
•	Terceros: con quién se comparten (por ejemplo, el socio de financiamiento, solo con consentimiento).
•	Derechos: derechos del usuario y cómo ejercerlos, datos de contacto del responsable.
•	Cookies: uso de cookies y herramientas de analítica.
El texto legal debe ser revisado por un asesor antes de publicar. Este plan define la estructura; no constituye asesoría legal.
 
4. Estrategia SEO
El SEO no es una capa que se añade al final: se diseña dentro de la arquitectura. El objetivo es que el nuevo sitio capture las búsquedas locales del sur de Florida que el sitio actual no toca, y que aproveche dos terrenos donde la competencia nacional es débil: el contenido genuinamente local y el mercado hispanohablante.
4.1 SEO técnico (la base)
•	Renderizado: renderizado del contenido del lado del servidor para que el buscador reciba HTML completo, no una página que depende de JavaScript.
•	Rendimiento: imágenes en formatos modernos, tamaños responsivos, carga diferida correcta y dimensiones declaradas para no penalizar Core Web Vitals.
•	Semántica: estructura de encabezados correcta (un solo H1 por página), URLs limpias y descriptivas, enlaces internos coherentes.
•	Indexación: sitemap XML, robots.txt, canonicals y metadatos completos por página.
•	Móvil: diseño totalmente responsivo y rápido en móvil, donde ocurre la mayoría de las búsquedas locales.
4.2 Metadatos por página
Cada página lleva título y meta descripción propios, fieles al contenido y optimizados para la búsqueda local. Ejemplos:
Página	Título / meta propuestos
Home	Florida Fiberglass Pools — Supplier, Installer & Repair in South Florida. El mayor showroom de piscinas de fibra de vidrio del sur de Florida.
Products	Catálogo de piscinas de fibra de vidrio — modelos, tamaños y colores. R1 a R19, spa y tanning ledge.
Projects	Showroom e instalaciones reales en el sur de Florida — fotos y video.
Create by Yourself	Diseña tu piscina y cotiza — configurador de Florida Fiberglass Pools.
FAQs	Preguntas frecuentes sobre piscinas de fibra de vidrio en Florida.
4.3 Datos estructurados (schema)
El sitio implementa marcado estructurado para que Google entienda el negocio y muestre resultados enriquecidos:
Tipo de schema	Dónde se aplica
LocalBusiness	Datos del showroom: dirección, teléfono, horario, zona de servicio. Refuerza el SEO de mapas.
Product	Cada modelo R1–R19: nombre, características, disponibilidad.
FAQPage	Página de FAQs, para optar a resultados desplegables en la búsqueda.
BreadcrumbList	Migas de navegación en todas las páginas internas.
Organization	Marca, logo, redes sociales, certificaciones.
4.4 Arquitectura local y bilingüe
Aquí está la mayor oportunidad frente a la competencia nacional, que opera con plantillas genéricas y sin contenido en español.
1.	Página madre “Fiberglass Pools in South Florida” que concentra autoridad y enlaza a las páginas de ciudad.
2.	Páginas locales por ciudad clave: Miami, Hialeah, Coral Gables, Kendall, Homestead, Doral, Aventura, Brickell — cada una con contenido real (suelo, permisos municipales, proyectos en la zona), nunca plantilla repetida.
3.	Versión en español de las páginas principales, con etiquetas hreflang correctas. El sur de Florida es mayoritariamente hispanohablante y la competencia no tiene contenido en español.
4.	Páginas de intención de compra: comparativa fibra de vidrio vs concreto, costo en Miami, proceso de permisos en Miami-Dade.
5.	Perfil de Google Business optimizado con fotos del showroom y reseñas activas, para ganar el paquete local de mapas.
El argumento que gana
Las páginas de la competencia dicen “servimos Miami”. Las de este sitio pueden decir “instalamos en Kendall, aquí están las fotos y el proceso de permisos de Miami-Dade”. Google premia la especificidad verificable, y el contenido en español abre un mercado que hoy nadie está atendiendo.
 
5. Sistema de componentes
Para mantener coherencia entre las ocho secciones, se define un sistema de componentes reutilizables. Esto garantiza que el home tenga impacto y las internas mantengan el mismo lenguaje en tono más calmo.
Componente	Descripción
Nav de vidrio flotante	Barra translúcida con desenfoque, se contrae al scroll, CTA y selector ES/EN siempre visibles.
Botón primario	Acento cian, física de resorte al hover, estados claros de foco para accesibilidad.
Tarjeta de producto	Vidrio sobre foto, selector de color, dimensiones en tipografía tabular.
Bloque de cifras	Contadores sobrios para las estadísticas del negocio.
Galería con lightbox	Transición compartida miniatura-a-ampliada para Projects.
Formulario segmentado	Campos con validación, selección de tipo de cliente, promesa de respuesta.
Pasos del configurador	Componente de flujo para Create by Yourself, full-screen en móvil.
Footer	Fondo profundo, mapa del sitio, certificaciones, contacto y redes.
Todos los componentes interactivos respetan prefers-reduced-motion y prefers-reduced-transparency, con respaldos sólidos de contraste garantizado.

6. Plan de implementación por fases
La construcción se ordena en fases para entregar valor temprano y reducir riesgo. Las fases son de diseño y contenido; las tecnologías concretas quedan a definición del equipo de desarrollo.
Fase 1 — Fundación (diseño y contenido base)
•	Diseño: sistema de diseño: paleta, tipografía, componentes, tratamiento de vidrio y movimiento.
•	Páginas core: Home, About, Contact y Privacy con copy fiel y corregido.
•	SEO base: unificación de datos del negocio y metadatos base.
Fase 2 — Catálogo y prueba visual
•	Catálogo: Products con catálogo R1–R19, filtros, colores y fichas.
•	Showroom: Projects con galería del showroom, fotos y videos reales.
•	Schema: datos estructurados de producto y negocio local.
Fase 3 — Configurador y captación
•	Configurador: módulo Create by Yourself completo con flujo de cotización.
•	FAQs: FAQs con datos estructurados.
•	Leads: integración del formulario con el flujo comercial.
Fase 4 — Expansión local y bilingüe
•	Local SEO: páginas locales por ciudad y página madre del sur de Florida.
•	Bilingüe: versión en español con hreflang.
•	Mapas y analítica: optimización de Google Business y medición.

Principio rector del desarrollo
Cambios quirúrgicos y verificables, sin sobreingeniería: cada sección se construye para cumplir su trabajo concreto, se prueba contra criterios claros (carga, accesibilidad, conversión) y se evita complejidad innecesaria. Primero un sitio sólido y rápido; los realces visuales se suman sin comprometer el rendimiento ni el SEO.
