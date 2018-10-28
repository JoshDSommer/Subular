import { Component, OnInit } from '@angular/core';
import { getString, setString } from 'tns-core-modules/application-settings';
import { CACHED_SONGS_KEY, CACHED_PLAYLISTS_KEY } from '../../services';
import { SUBULAR_CACHED_ALBUMS, SUBULAR_CACHED_ARTISTS } from '@Subular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as fs from 'tns-core-modules/file-system';

@Component({
  moduleId: module.id,
  selector: 'supa',
  templateUrl: './supa.component.html',
  styleUrls: ['./supa.component.css']
})
export class SupaComponent implements OnInit {
  constructor(private router: RouterExtensions) {}

  ngOnInit() {}

  clearCachedAlubms() {
    setString(SUBULAR_CACHED_ALBUMS, '');
    setString(SUBULAR_CACHED_ARTISTS, '');
    this.router.navigate(['/login'], { clearHistory: true });
  }

  clearArtwork() {
    fs.knownFolders
      .documents()
      .getFolder('images')
      .clear();
    fs.knownFolders
      .documents()
      .getFolder('artist-images')
      .clear();
  }

  clearSongs() {
    fs.knownFolders.documents().clear();
  }
}
