package com.inmost.bulletinboard.security.model;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class SignUpRequest {

    @NotNull
    @Email(message = "Invalid email.")
    @Size(min = 5, max = 71, message = "Email length must be 5-71(with @) symbols.")
    @Pattern(
            regexp = "^\\w[a-zA-Z0-9.!#$%&\u2019*+/=?^_`{|}~\"-]{0,34}@((\\[?[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}]?)|(([a-zA-Z0-9][a-zA-Z\\-0-9]*\\.)+[a-zA-Z]+))$",
            message = "Only digits, Latin letters and special characters allowed."
    )
    private String email;

    @NotNull
    @Size(min = 8, max = 32, message = "Password length must be 8-32 symbols.")
    @Pattern(
            regexp = "^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,32}$",
            message = "Only digits, Latin letters and special characters allowed."
    )
    private String password;

    @NotNull
    @Size(min = 1, max = 15, message = "Firstname length must be 1-15 symbols.")
    @Pattern(
            regexp = "^[\\d\\D]{1,15}$",
            message = "Only digits, Latin letters and special characters allowed."
    )
    private String firstName;

    @NotNull
    @Size(min = 1, max = 15, message = "Lastname length must be 1-15 symbols.")
    @Pattern(
            regexp = "^[\\d\\D]{1,15}$",
            message = "Only digits, Latin letters and special characters allowed."
    )
    private String lastName;

}
