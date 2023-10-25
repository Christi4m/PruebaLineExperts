package com.pruebaline.technical_test.services;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.pruebaline.technical_test.model.dtos.InvoiceCsv;
import com.pruebaline.technical_test.model.entities.Invoice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CsvService {



    public List<InvoiceCsv> readCsv(MultipartFile file) throws Exception {
        try (Reader reader = new InputStreamReader(file.getInputStream())) {

            printReaderContent(reader);
            CsvToBean<InvoiceCsv> csvToBean = new CsvToBeanBuilder<InvoiceCsv>(reader)
                    .withType(InvoiceCsv.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();


            return csvToBean.parse();
        }
    }

    public static void printReaderContent(Reader reader) {
        BufferedReader bufferedReader = null;
        try {
            bufferedReader = new BufferedReader(reader);
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                log.info("info csv {}", line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

