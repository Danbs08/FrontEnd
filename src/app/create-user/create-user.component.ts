import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Usuario } from '../user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  usuarioForm: FormGroup = new FormGroup({});
  correoExists: boolean = false;
  cedulaExists: boolean = false;
  usuario: Usuario | undefined;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });
    this.usuario = history.state.usuario;
    if (this.usuario) {
      this.usuarioForm.setValue({
        nombres: this.usuario.nombres,
        apellidos: this.usuario.apellidos,
        cedula: this.usuario.cedula,
        correo: this.usuario.correo,
        telefono: this.usuario.telefono
      });
    }
  }
  
  checkCorreo(): void {
    const correo = this.usuarioForm.get('correo');
    if (correo && correo.value) {
      this.userService.getAllUsuarios().subscribe((usuarios: Usuario[]) => {
        this.correoExists = usuarios.some((u: Usuario) => u.correo === correo.value && u.id !== this.usuario?.id);
      });
    }
  }
  
  checkCedula(): void {
    const cedula = this.usuarioForm.get('cedula');
    if (cedula && cedula.value) {
      this.userService.getAllUsuarios().subscribe((usuarios: Usuario[]) => {
        this.cedulaExists = usuarios.some((u: Usuario) => u.cedula === cedula.value && u.id !== this.usuario?.id);
      });
    }
  }

  onSubmit(): void {
    const usuario: Usuario = this.usuarioForm.value;
  
    if (this.correoExists || this.cedulaExists) {
      return;
    }
  
    if (this.usuario) {
      this.userService.updateUsuario(this.usuario.id || 0, usuario).subscribe(() => {
        console.log('Usuario editado exitosamente');
        this.router.navigate(['/']);
      });
    } else {
      this.userService.createUsuario(usuario).subscribe(() => {
        console.log('Usuario creado exitosamente');
        this.router.navigate(['/']);
      });
    }
  }  
}