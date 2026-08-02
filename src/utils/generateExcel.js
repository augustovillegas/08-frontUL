import ExcelJS from "exceljs";

const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
};

// Paleta Democratik
const COLORS = {
  green:       "27AE60",
  greenLight:  "D5F0E0",
  dark:        "1E1F25",
  darkMid:     "2C2D35",
  purple:      "9932CC",
  purpleLight: "F0E0FA",
  white:       "FFFFFF",
  grayRow:     "F4F4F6",
  grayText:    "828282",
  border:      "D0D0D8",
};

const font = (name = "Calibri", size = 11, bold = false, color = COLORS.dark) => ({
  name,
  size,
  bold,
  color: { argb: "FF" + color },
});

const fill = (color) => ({
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF" + color },
});

const border = (style = "thin", color = COLORS.border) => {
  const side = { style, color: { argb: "FF" + color } };
  return { top: side, left: side, bottom: side, right: side };
};

const align = (horizontal = "left", vertical = "middle", wrapText = false) => ({
  horizontal,
  vertical,
  wrapText,
});

const COLUMNS = [
  { key: "index",          header: "N°",               width: 6 },
  { key: "fecha",          header: "Fecha afiliación", width: 18 },
  { key: "nombre",         header: "Nombre",           width: 28 },
  { key: "dni",            header: "DNI",              width: 14 },
  { key: "correo",         header: "Correo",           width: 30 },
  { key: "celular",        header: "Teléfono",         width: 16 },
  { key: "domicilio",      header: "Domicilio",        width: 28 },
  { key: "ocupacion",      header: "Ocupación",        width: 20 },
  { key: "estadoCivil",    header: "Estado civil",     width: 16 },
  { key: "pais",           header: "País",             width: 14 },
  { key: "provincia",      header: "Provincia",        width: 18 },
  { key: "departamento",   header: "Ciudad / Depto.",  width: 20 },
];

const TOTAL_COLS = COLUMNS.length;

export async function generateAffiliatesExcel(afiliados) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Democratik";
  workbook.created = new Date();
  workbook.modified = new Date();

  const sheet = workbook.addWorksheet("Afiliados", {
    pageSetup: {
      paperSize: 9,           // A4
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: { left: 0.5, right: 0.5, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 },
    },
    headerFooter: {
      oddHeader: "&C&\"Calibri,Bold\"&14DEMOCRATIK — Listado de Afiliados",
      oddFooter: "&L&\"Calibri\"Democratik &P de &N&R&\"Calibri\"Generado: &D",
    },
  });

  // ── Anchos de columna ──────────────────────────────────────────
  sheet.columns = COLUMNS.map((c) => ({ key: c.key, width: c.width }));

  // ── Fila 1: Logo / Título principal ───────────────────────────
  sheet.mergeCells(1, 1, 1, TOTAL_COLS);
  const titleCell = sheet.getCell("A1");
  titleCell.value = "DEMOCRATIK";
  titleCell.font = font("Calibri", 22, true, COLORS.white);
  titleCell.fill = fill(COLORS.green);
  titleCell.alignment = align("center", "middle");
  titleCell.border = border("medium", COLORS.green);
  sheet.getRow(1).height = 40;

  // ── Fila 2: Subtítulo ─────────────────────────────────────────
  sheet.mergeCells(2, 1, 2, TOTAL_COLS);
  const subtitleCell = sheet.getCell("A2");
  subtitleCell.value = "Listado de Afiliados";
  subtitleCell.font = font("Calibri", 13, false, COLORS.white);
  subtitleCell.fill = fill(COLORS.dark);
  subtitleCell.alignment = align("center", "middle");
  sheet.getRow(2).height = 22;

  // ── Fila 3: Metadata (fecha + total) ──────────────────────────
  const metaHalf = Math.floor(TOTAL_COLS / 2);
  sheet.mergeCells(3, 1, 3, metaHalf);
  const dateCell = sheet.getCell("A3");
  dateCell.value = `Generado: ${new Date().toLocaleDateString("es-ES", {
    day: "2-digit", month: "long", year: "numeric",
  })}`;
  dateCell.font = font("Calibri", 10, false, COLORS.grayText);
  dateCell.fill = fill(COLORS.grayRow);
  dateCell.alignment = align("left", "middle");

  sheet.mergeCells(3, metaHalf + 1, 3, TOTAL_COLS);
  const totalCell = sheet.getCell(3, metaHalf + 1);
  totalCell.value = `Total de afiliados: ${afiliados.length}`;
  totalCell.font = font("Calibri", 10, true, COLORS.purple);
  totalCell.fill = fill(COLORS.grayRow);
  totalCell.alignment = align("right", "middle");
  sheet.getRow(3).height = 18;

  // ── Fila 4: Separador vacío ────────────────────────────────────
  sheet.mergeCells(4, 1, 4, TOTAL_COLS);
  sheet.getCell("A4").fill = fill(COLORS.green);
  sheet.getRow(4).height = 4;

  // ── Fila 5: Encabezados de columnas ───────────────────────────
  const headerRow = sheet.getRow(5);
  headerRow.height = 24;
  COLUMNS.forEach((col, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = col.header.toUpperCase();
    cell.font = font("Calibri", 10, true, COLORS.white);
    cell.fill = fill(COLORS.darkMid);
    cell.alignment = align("center", "middle");
    cell.border = {
      top:    { style: "thin",   color: { argb: "FF" + COLORS.green } },
      bottom: { style: "medium", color: { argb: "FF" + COLORS.green } },
      left:   { style: "thin",   color: { argb: "FF" + COLORS.dark  } },
      right:  { style: "thin",   color: { argb: "FF" + COLORS.dark  } },
    };
  });

  // ── Filas de datos ─────────────────────────────────────────────
  afiliados.forEach((a, idx) => {
    const rowData = {
      index:        idx + 1,
      fecha:        a.fecha
        ? new Date(a.fecha).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })
        : "",
      nombre:       toTitleCase(a.nombre),
      dni:          a.dni          || "",
      correo:       (a.correo      || "").toLowerCase(),
      celular:      a.celular      || "",
      domicilio:    toTitleCase(a.domicilio),
      ocupacion:    a.ocupacion    || "",
      estadoCivil:  a.estadoCivil  || "",
      pais:         a.pais         || "",
      provincia:    toTitleCase(a.provincia),
      departamento: toTitleCase(a.departamento),
    };

    const dataRow = sheet.addRow(rowData);
    dataRow.height = 18;

    const isEven = idx % 2 === 0;
    const rowFill = fill(isEven ? COLORS.white : COLORS.grayRow);

    dataRow.eachCell({ includeEmpty: true }, (cell, colNum) => {
      cell.fill = rowFill;
      cell.font = font("Calibri", 10, false, COLORS.dark);
      cell.border = border("hair", COLORS.border);
      cell.alignment = align(colNum === 1 ? "center" : "left", "middle");

      // Resaltar el nombre en verde suave
      if (colNum === 3) {
        cell.font = font("Calibri", 10, true, COLORS.dark);
      }
      // Resaltar DNI con fondo leve
      if (colNum === 4) {
        cell.fill = fill(isEven ? COLORS.greenLight : "E8F8EE");
        cell.alignment = align("center", "middle");
      }
    });
  });

  // ── Fila final: pie de tabla ────────────────────────────────────
  const footerRowNum = 5 + afiliados.length + 1;
  sheet.mergeCells(footerRowNum, 1, footerRowNum, TOTAL_COLS);
  const footerCell = sheet.getCell(footerRowNum, 1);
  footerCell.value = "© Democratik — Documento generado automáticamente. No requiere firma.";
  footerCell.font = font("Calibri", 9, false, COLORS.white);
  footerCell.fill = fill(COLORS.purple);
  footerCell.alignment = align("center", "middle");
  sheet.getRow(footerRowNum).height = 16;

  // ── Congelar encabezados ────────────────────────────────────────
  sheet.views = [{ state: "frozen", ySplit: 5, xSplit: 0, activeCell: "A6" }];

  // ── Filtros automáticos ────────────────────────────────────────
  sheet.autoFilter = {
    from: { row: 5, column: 1 },
    to:   { row: 5, column: TOTAL_COLS },
  };

  // ── Exportar a blob ─────────────────────────────────────────────
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
