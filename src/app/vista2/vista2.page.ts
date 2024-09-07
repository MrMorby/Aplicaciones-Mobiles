import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vista2',
  templateUrl: './vista2.page.html',
  styleUrls: ['./vista2.page.scss'],
})
export class Vista2Page implements OnInit {
  registerForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    // Inicializa el formulario reactivo con validaciones
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  // Maneja el envío del formulario
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.router.navigate(['/main']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
