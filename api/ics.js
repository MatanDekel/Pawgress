// Returns a single calendar event as an .ics file, so phones open "Add to calendar".
module.exports = (req, res) => {
  const q = req.query || {};
  const clip = (v, n) => String(v || "").slice(0, n);
  const esc = v => v.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/([,;])/g, "\\$1");
  const s = Number(q.s), e = Number(q.e);
  if (!Number.isFinite(s) || !Number.isFinite(e) || e <= s) { res.statusCode = 400; return res.end("Bad request"); }
  const u = x => new Date(x).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const id = clip(q.id, 40).replace(/[^a-zA-Z0-9-]/g, "") || String(s);
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Pawgress//HE", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT", `UID:${id}@pawgress`, `DTSTAMP:${u(Date.now())}`, `DTSTART:${u(s)}`, `DTEND:${u(e)}`,
    `SUMMARY:${esc(clip(q.t, 200))}`];
  if (q.l) lines.push(`LOCATION:${esc(clip(q.l, 200))}`);
  if (q.d) lines.push(`DESCRIPTION:${esc(clip(q.d, 1000))}`);
  lines.push("BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Pawgress", "TRIGGER:-PT1H", "END:VALARM", "END:VEVENT", "END:VCALENDAR");
  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="pawgress-lesson.ics"');
  res.setHeader("Cache-Control", "no-store");
  res.end(lines.join("\r\n"));
};
