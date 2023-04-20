import { Component } from '@angular/core';
import { Usuario } from '../user';
import { UserService } from '../user.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  usuarios: Usuario[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getAllUsuarios();
  }

  getAllUsuarios(): void {
    this.userService.getAllUsuarios()
      .subscribe(usuarios => this.usuarios = usuarios);
  }

  deleteUsuario(id: number) {
    this.userService.deleteUsuario(id)
      .subscribe(() => {
        console.log(`Usuario con id=${id} eliminado.`);
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      });
  }
  
  editUsuario(usuario: Usuario) {
    const extras: NavigationExtras = {
      state: {
        usuario: usuario
      }
    };
    this.router.navigate(['/app-create-user'], extras);
  }
}