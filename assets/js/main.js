/* =========================================================
   Portfolio — นราวิชญ์ ศิริ
   ไฟล์ JavaScript หลัก (ไม่ใช้ไลบรารีภายนอก)

   ทำอะไรบ้าง
   1.  เปิด/ปิดเมนูบนมือถือ
   2.  ไฮไลต์เมนูตามตำแหน่งที่เลื่อนอยู่
   3.  เตรียมให้ทุกอย่างค่อยๆ ปรากฏ (scroll reveal)
   4.  เติมแถบความชำนาญเมื่อเลื่อนมาถึง (พร้อมนับเลข % ไล่ขึ้น)
   5.  แถบความคืบหน้าการเลื่อนหน้า
   6.  ปุ่มกลับขึ้นด้านบน
   7.  ปุ่มพิมพ์ / บันทึกเป็น PDF
   8.  อัปเดตปีในส่วนท้ายอัตโนมัติ
   9.  คลิกอีเมลแล้วคัดลอกที่อยู่ให้ทันที พร้อมข้อความแจ้งเตือน
   ========================================================= */

(function () {
  "use strict";

  /* ตรวจว่าเบราว์เซอร์เปิดโหมดลดอนิเมชันหรือไม่ */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* รอให้ HTML โหลดเสร็จก่อนเริ่มทำงาน */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setupHeader();
    setupMobileNav();
    setupReveal();
    setupProgressBar();
    setupScrollProgress();
    setupToTop();
    setupPrintButton();
    setupFooterYear();
    setupCopyEmail();
  }

  /* ---------------------------------------------------------
     1. Header — เพิ่มเงาเมื่อเลื่อนหน้าจอ
     --------------------------------------------------------- */
  function setupHeader() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     2. เมนูบนมือถือ + ไฮไลต์เมนูที่กำลังดูอยู่
     --------------------------------------------------------- */
  function setupMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("primaryNav");
    if (!toggle || !nav) return;

    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    /* ปิดเมนูเมื่อกดลิงก์ */
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    /* ปิดเมนูเมื่อกด Esc */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    /* ปิดเมนูเมื่อคลิกนอกเมนู */
    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeNav();
    });

    /* ปิดเมนูเมื่อย่อ/ขยายหน้าจอเป็นขนาดเดสก์ท็อป */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });

    highlightNavOnScroll();
  }

  /* ไฮไลต์ลิงก์เมนูที่ตรงกับส่วนที่กำลังมองเห็น */
  function highlightNavOnScroll() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    if (!links.length) return;

    var sections = links
      .map(function (link) {
        var id = link.getAttribute("href");
        return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    var setActive = function (id) {
      links.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + id;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    if (!("IntersectionObserver" in window)) {
      /* ทางเลือกสำรองสำหรับเบราว์เซอร์เก่า */
      window.addEventListener(
        "scroll",
        function () {
          var current = sections[0];
          sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 140) current = section;
          });
          setActive(current.id);
        },
        { passive: true }
      );
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------------------------------------------------------
     3. Scroll reveal — ให้เนื้อหาค่อยๆ ปรากฏ
     --------------------------------------------------------- */
  function setupReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!items.length) return;

    /* ถ้าไม่มี IntersectionObserver หรือผู้ใช้ปิดอนิเมชัน ให้แสดงทันที */
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    /* หน่วงเวลาเล็กน้อยเป็นจังหวะไล่กันไป (stagger) */
    items.forEach(function (item, index) {
      item.style.transitionDelay = (index % 4) * 70 + "ms";
      observer.observe(item);
    });
  }

  /* ---------------------------------------------------------
     4. แถบความชำนาญ — เติมเมื่อเลื่อนมาถึง
     --------------------------------------------------------- */
  function setupProgressBar() {
    var bars = Array.prototype.slice.call(document.querySelectorAll(".progress-bar"));
    if (!bars.length) return;

    var levelOf = function (bar) {
      return Number(bar.getAttribute("data-level")) || 0;
    };

    /* เลข % ที่คู่กับแถบนั้น */
    var labelOf = function (bar) {
      var item = bar.closest(".progress-item");
      return item ? item.querySelector(".progress-pct") : null;
    };

    var fill = function (bar) {
      var level = levelOf(bar);
      bar.style.width = level + "%";
      bar.style.setProperty("--print-width", level + "%");
    };

    /* นับตัวเลข 0 → ค่าจริง ให้จังหวะเดียวกับแถบที่ค่อยๆ กว้างขึ้น */
    var countUp = function (bar) {
      var label = labelOf(bar);
      if (!label || !window.requestAnimationFrame) return;

      var level = levelOf(bar);
      var duration = 1100;
      var start = null;

      var step = function (now) {
        if (start === null) start = now;
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        label.textContent = Math.round(level * eased) + "%";
        if (progress < 1) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    };

    /* เตรียมค่าไว้ล่วงหน้าเพื่อให้โหมดพิมพ์แสดงแถบเต็มเสมอ
       แม้ผู้ใช้กดพิมพ์โดยยังไม่เคยเลื่อนมาถึงส่วนทักษะ */
    bars.forEach(function (bar) {
      bar.style.setProperty("--print-width", levelOf(bar) + "%");
    });

    if (!("IntersectionObserver" in window) || reduceMotion) {
      bars.forEach(function (bar) {
        fill(bar);
        var label = labelOf(bar);
        if (label) label.textContent = levelOf(bar) + "%";
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          fill(entry.target);
          countUp(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    bars.forEach(function (bar) {
      observer.observe(bar);
    });
  }

  /* ---------------------------------------------------------
     5. แถบความคืบหน้าการเลื่อนหน้า
     --------------------------------------------------------- */
  function setupScrollProgress() {
    var bar = document.getElementById("scrollProgress");
    if (!bar) return;

    var update = function () {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var percent = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      bar.style.width = Math.min(percent, 100) + "%";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------------------------------------------------------
     6. ปุ่มกลับขึ้นด้านบน
     --------------------------------------------------------- */
  function setupToTop() {
    var button = document.getElementById("toTop");
    if (!button) return;

    var onScroll = function () {
      button.classList.toggle("is-visible", window.scrollY > 500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------------
     7. ปุ่มพิมพ์ / บันทึกเป็น PDF
     --------------------------------------------------------- */
  function setupPrintButton() {
    var button = document.getElementById("printBtn");
    if (!button) return;

    button.addEventListener("click", function () {
      window.print();
    });
  }

  /* ---------------------------------------------------------
     8. ปีในส่วนท้าย
     --------------------------------------------------------- */
  function setupFooterYear() {
    var year = document.getElementById("year");
    if (!year) return;
    year.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------
     9. คลิกอีเมล → คัดลอกที่อยู่ + แจ้งเตือน
     --------------------------------------------------------- */

  /* แสดงข้อความสั้นๆ ด้านล่างจอ แล้วหายไปเอง */
  function showToast(message) {
    var toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("is-visible");

    /* ยกเลิกตัวนับเวลาเดิมก่อน เพื่อไม่ให้กดรัวๆ แล้วข้อความค้าง */
    if (showToast.timer) window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  /* คัดลอกข้อความ: ใช้ Clipboard API ก่อน ถ้าไม่ได้ค่อยใช้วิธีสำรอง */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text);
      });
    }
    return legacyCopy(text);
  }

  /* วิธีสำรอง: สร้างช่องข้อความชั่วคราวแล้วสั่ง copy
     จำเป็นเมื่อเปิดไฟล์ตรงๆ ด้วย file:// ซึ่ง Clipboard API ใช้ไม่ได้ */
  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.top = "-1000px";
      document.body.appendChild(field);
      field.select();
      field.setSelectionRange(0, text.length);

      var success = false;
      try {
        success = document.execCommand("copy");
      } catch (error) {
        success = false;
      }
      document.body.removeChild(field);

      success ? resolve() : reject(new Error("copy-not-supported"));
    });
  }

  function setupCopyEmail() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".js-copy-email"));
    if (!links.length) return;

    links.forEach(function (link) {
      var address = (link.getAttribute("href") || "").replace(/^mailto:/i, "");

      /* บอกล่วงหน้าว่าคลิกแล้วจะได้อะไร */
      link.setAttribute("title", "คลิกเพื่อคัดลอกอีเมล");
      link.setAttribute("aria-label", "คัดลอกอีเมล " + address);

      link.addEventListener("click", function (event) {
        /* ไม่ต้องเปิดโปรแกรมอีเมล ให้คัดลอกอย่างเดียว */
        event.preventDefault();

        copyText(address).then(
          function () {
            showToast("คัดลอกอีเมลแล้ว: " + address);
          },
          function () {
            showToast("คัดลอกอัตโนมัติไม่ได้ กรุณาคัดลอกอีเมลด้วยตนเอง: " + address);
          }
        );
      });
    });
  }
})();
