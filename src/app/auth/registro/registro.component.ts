import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  SignUp() {
    return this.afAuth
      .createUserWithEmailAndPassword(
        this.registroForm.controls['username'].value,
        this.registroForm.controls['password'].value
      )
      .then(async (result) => {
        console.log(result);
        const toast = await this.toastController.create({
          message: 'Haz creado una cuenta en FantasyMaker',
          color: 'success',
          duration: 3000,
        });
        await toast.present();
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  private createForm() {
    this.registroForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)],
      ],
      password: [null, Validators.required],
    });
  }

  regresar(): void {
    this.router.navigate(['/home']);
  }
}
