package com.pruebaline.technical_test.model.dtos;

import com.opencsv.bean.CsvBindByName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceCsv {


    @CsvBindByName(column = "Codigo factura")
    private String invoiceCode;

    @CsvBindByName(column = "Nombre y apellidos")
    private String fullName;

    @CsvBindByName(column = "Dirección")
    private String address;

    @CsvBindByName(column = "Valor a pagar")
    private double amountDue;

    @CsvBindByName(column = "Fecha de vencimiento")
    private Date dueDate;

    @CsvBindByName(column = "Fecha oportuna de pago")
    private Date promptPaymentDate;

    @CsvBindByName(column = "Estado")
    private String status;

    // getters and setters...
}