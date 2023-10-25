package com.pruebaline.technical_test.services;

import com.pruebaline.technical_test.herlpers.CSVHelper;
import com.pruebaline.technical_test.model.entities.Invoice;
import com.pruebaline.technical_test.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InvoiceService {

    private final InvoiceRepository repository;

    @Transactional()
    public void save(MultipartFile file) {
        try {
            List<Invoice> invoices = CSVHelper.csvToTutorials(file.getInputStream());
            for (Invoice inv : invoices) {

                Optional<Invoice> in = repository.findByInvoiceCode(inv.getInvoiceCode());

                if(!in.isPresent()){
                    repository.save(inv);
                }

            }
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    @Transactional()
    public void rejectInvoice(Long[] data) {

        for (Long id: data) {
            var invoice = repository.findById(id);

            if(invoice.isPresent()){
                invoice.get().setState("Rechazado");
                repository.save(invoice.get());
            }

        }
    }

    @Transactional(readOnly = true)
    public List<Invoice> findAll() {
        return repository.findAll()
                .stream()
                .toList();
    }

}

