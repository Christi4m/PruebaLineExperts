package com.pruebaline.technical_test.constroller;

import com.pruebaline.technical_test.herlpers.CSVHelper;
import com.pruebaline.technical_test.model.entities.Invoice;
import com.pruebaline.technical_test.services.InvoiceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/invoice")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5173")
@Slf4j
public class InvoiceController {
    private final InvoiceService invoiceService;


    @PostMapping
    public ResponseEntity<?> uploadCsvFile(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        if (CSVHelper.hasCSVFormat(file)) {
            try {
                invoiceService.save(file);

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @PostMapping("/reject")
    public ResponseEntity<?> rejectInvoice(@RequestBody Long[] data) throws IOException {
        if(data.length == 0){
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("not found info id invoice");
        }

        invoiceService.rejectInvoice(data);
        return ResponseEntity.status(HttpStatus.OK).body("Invoice reject sucess");
    }
    @GetMapping
    public List<Invoice> getAll() {
        return invoiceService.findAll();
    }
}
