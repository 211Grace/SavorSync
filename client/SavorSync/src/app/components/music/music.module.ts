import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MusicPlayerComponent } from './music-player/music-player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { MoodPlaylistsComponent } from './mood-playlists/mood-playlists.component';

const routes: Routes = [
  { path: '', component: MusicPlayerComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'mood/:mood', component: MoodPlaylistsComponent }
];

@NgModule({
  declarations: [
    MusicPlayerComponent,
    PlaylistComponent,
    MoodPlaylistsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MusicModule { }
