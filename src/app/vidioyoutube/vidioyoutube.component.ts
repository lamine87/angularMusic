import { Component, OnInit } from '@angular/core';
import { Media } from '../models/media';

@Component({
  selector: 'app-vidioyoutube',
  templateUrl: './vidioyoutube.component.html',
  styleUrls: ['./vidioyoutube.component.css']
})
export class VidioyoutubeComponent implements OnInit {

  constructor() { }
  public media : any ;
  image!: string;
  play!: string;
  vidoDisabled: boolean = true;
  selectedHome!: Media;


  ngOnInit(): void {
  }
  changeImg(){
    if (this.play == "play")
    {
      this.play = "Pause",
      this.image = "image"
    }else{
      this.play = "Play"
      this.image = "image"
    }
  }

}
