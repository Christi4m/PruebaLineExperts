package com.pruebaline.technical_test.herlpers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.pruebaline.technical_test.model.entities.Invoice;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;
@Slf4j
public class CSVHelper {
    public static String TYPE = "text/csv";

    public static boolean hasCSVFormat(MultipartFile file) {

        if (!TYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }

    public static List<Invoice> csvToTutorials(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Invoice> invoices = new ArrayList<Invoice>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

            for (CSVRecord csvRecord : csvRecords) {
                Invoice invoice = new Invoice();

                invoice.setInvoiceCode(csvRecord.get(0));
                invoice.setFullName(csvRecord.get(1));
                invoice.setAddress(csvRecord.get(2));
                invoice.setAmountDue(Double.parseDouble(csvRecord.get(3)));
                invoice.setDueDate(formatter.parse(csvRecord.get(4)));
                invoice.setPromptPaymentDate(formatter.parse(csvRecord.get(5)));
                invoice.setState(csvRecord.get(6).equalsIgnoreCase("") ? "Pendiente" : csvRecord.get(6));

                invoices.add(invoice);
            }

            return invoices;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

}