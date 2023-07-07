import { Component, OnInit } from '@angular/core';
import { DalleServiceService } from '@app/@shared/services/dalle-service/dalle-service.service';

@Component({
  selector: 'app-character-image',
  templateUrl: './character-image.component.html',
  styleUrls: ['./character-image.component.scss'],
})
export class CharacterImageComponent implements OnInit {
  characters: any[] = [];
  create = false;
  constructor(private dalleServ: DalleServiceService) {}

  ngOnInit(): void {}

  async createCharacter(age: any, gender: any, specie: any, description: any, kind: any) {
    this.create = true;
    this.characters = [];
    const prompt = `personaje de estilo ${kind} que sea de una especie ${specie} que sea de genero ${gender} que tenga ${age} añós de edad y que sea ${description} en un dibujo profesional digital de cuerpo completo con fondo blanco`;
    console.log(prompt);
    const response = await this.dalleServ.createCharacter(prompt);
    response.subscribe((data) => {
      console.log(data);
      this.create = false;
      this.characters = data['data'];
    });
  }

  setCharacter() {
    localStorage.setItem('img', this.characters[0].url);

    localStorage.getItem('img');
  }
}
