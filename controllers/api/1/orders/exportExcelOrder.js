const ExcelJS = require("exceljs");
const { Order, Token } = require("../../../../models");
// const { HttpError } = require('../../../../utils/helpers');

const exportExcelOrder = async (req, res) => {
    try {
        const { orderId: token } = req.params;
        console.log(token);
        const tokenRecord = await Token.findOne({ token });
        if (!tokenRecord) {
            return res.status(432).json({ error: "Список не знайдено" });
        }

        const existingOrder = await Order.findById(tokenRecord.orderId);
        if (!existingOrder) {
            res.status(432).json({ error: "Список не знайдено" });
        }

        const date = new Date(existingOrder.issueDate).toLocaleDateString();
        // Create a new Excel workbook and add a worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Active Orders");

        // Add the general fields in a single row, each in its own column
        // const generalFields = [
        //   { label: 'Загальна кількість ', value: existingOrder.maxQuantity },
        //   { label: 'Підтвердженні  ', value: existingOrder.confirmedPersons },
        //   { label: 'Дата Видачі', value: existingOrder.issueDate },
        //   { label: 'Категорія', value: existingOrder.type },
        // ];

        // generalFields.forEach(field => {
        //   const cell = worksheet.addRow([field.label, field.value]).getCell(1);
        //   cell.font = { size: 12, bold: true };
        //   worksheet.getColumn(1).width = Math.max(15, field.label.length + 5);

        // });

        // generalFields.forEach(field => {
        //   const row = worksheet.addRow([field.label, field.value]);
        //   const cell = row.getCell(1);
        //   cell.font = { size: 10, bold: true };
        //   worksheet.getColumn(1).width = Math.max(10, field.label.length + 5);
        //   if (field.label === 'Категорія') {
        //     row.getCell(2).alignment = { horizontal: 'right' };
        //   }
        // });

        // Add an empty row
        // worksheet.addRow([]);

        // Add headers for person-specific data in the next row
        // Create a separate header row for person-specific data
        const headerRow = worksheet.addRow([
            "Номер",
            "Прізвище",
            "Ім`я",
            "По-батькові",
            "Вулиця",
            "Будівля",
            "Квартира",
            "Посвідчення",
            "Переміщені",
            "Область",
            "Телефон",
        ]);

        headerRow.eachCell((cell) => {
            cell.font = { size: 12, bold: true };
            // Adjust column width based on the content
            // worksheet.getColumn(cell.col).width = Math.max(15, cell.value.length + 5); // Adjust as needed
            const contentWidth = cell.value.toString().length * 1.2;
            worksheet.getColumn(cell.col).width = Math.max(contentWidth, 18);
        });

        // worksheet.addRow([]);

        let index = 1;
        existingOrder.persons.forEach((person) => {
            if (person.isActivated) {
                // Create an array for the row with person-specific data
                const rowData = [
                    index++,
                    person.surname,
                    person.name,
                    person.patrname,
                    person.street,
                    person.building,
                    person.apartment,
                    person.certificateNumber,
                    person.settlementFrom,
                    person.regionFrom,
                    person.phone,
                ];

                // Add the row to the worksheet
                const row = worksheet.addRow(rowData, { outlineLevel: 0 });

                row.eachCell((cell) => {
                    cell.font = { size: 12 };
                });
                row.getCell(1).alignment = { horizontal: "left" };
            }
        });

        await Token.deleteOne({ token });
        // Set response headers for Excel file download
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=status_${existingOrder.status}_type_${existingOrder.type}_date_${date}.xlsx`
        );
        // Send the Excel file as a response
        await workbook.xlsx.write(res);

        // End the response
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Помилка на боці сервера" });
    }
};

module.exports = exportExcelOrder;
