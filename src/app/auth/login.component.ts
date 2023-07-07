import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, Platform, ToastController } from '@ionic/angular';

import { environment } from '@env/environment';
import { Logger, UntilDestroy } from '@shared';
import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private platform: Platform,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  async login() {
    const loadingOverlay = await this.loadingController.create({});
    return this.afAuth
      .signInWithEmailAndPassword(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .then((result) => {
        console.log(result);
        this.afAuth.authState.subscribe((user) => {
          console.log('user', user);
          if (user) {
            this.authenticationService.login({ username: `${user.email}`, password: '' });
            this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
          }
          loadingOverlay.dismiss();
        });
      })
      .catch(async (error) => {
        console.log(error);
        loadingOverlay.dismiss();
        let message = error.message;
        switch (error.message) {
          case 'auth/user-not-found':
            message = 'Email no encontrado';
            break;
          case 'auth/wrong-password':
            message = 'Email o contraseña incorrecta';
            break;
        }
        const toast = await this.toastController.create({
          message,
          color: 'danger',
          duration: 3000,
        });
        void toast.present();
      });
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }

  registro(): void {
    this.router.navigate(['/registro']);
  }
}
