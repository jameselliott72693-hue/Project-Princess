# Petal Palace

A princess sandbox. Design an original princess, build a little kingdom, and walk her through it. Everything runs in the browser: no account, no ads, no chat, and no server.

The pictures and sounds are original. Nothing here is meant to copy a movie princess or a trademarked castle.

## Run it

From this folder:

```bash
python3 -m http.server
```

Open the address the server prints, usually [http://localhost:8000](http://localhost:8000).

You can also open `index.html` directly in a browser. Saving pictures works more reliably with the small local server above.

## Phone, tablet, and desktop

The pages use big buttons, short labels, and a map you can place or slide. On a small screen, tap **Bigger** if the tiles feel tiny, then **Slide** to move the map and **Place** to build.

## Play

**Design** — change skin, face, eyes, hair, dresses, shoes, crowns, capes, wands, jewelry, and a pet. Hair includes long, wavy, curly, coily, braids, a side braid, a bun, twin buns, a bob, a pixie cut, a ponytail, twists, and a halo braid. Outfits include gowns, adventure clothes, armor, a blossom dress, a frost dress, pajamas, and a festival dress. Pets include a cat, a pup, a dragon, a bird, and a bunny. **Random** mixes a look. **Undo** steps back. **Save** keeps her on this device. **Picture** downloads a PNG portrait.

**Build** — tap a piece, then tap the map. Pieces include castle walls, towers, a gate, and a throne; beds, tables, rugs, shelves, cakes, and swings; grass, paths, water, bridges, trees, gardens, and flowers; houses, a bakery, and market stalls; animals and small decorations. Winter adds snow, ice, pines, and snowmen. Seaside adds sand, sea, palms, shells, and boats. During the snow festival a wreath can be placed. During the spring garden a blossom can be placed. **Cozy**, **Wide**, and **Grand** change the map size. Older saves stay cozy meadow maps. **Erase** paints the ground for the current theme. **Undo** removes the last stroke. **Starters** opens a meadow, a little castle, a riverside, a royal garden, a snow castle, a sunny shore, or a grand meadow. **Save** keeps the kingdom on this device.

**Explore** — from Design, tap **Walk**. From Build, tap **Explore**. Move with the arrow buttons, the arrow keys, WASD, or a tap on open ground. On a wide or grand map the view follows her. Her chosen pet walks along behind her and perks up at fountains, flowers, and animals. She will not cross walls, sea, or water. Bridges and the castle gate are fine. A fountain sparkles, animals react, and the gate, throne, houses, bakery, and market open a simple room.

**Quests** — three gentle jobs: find the kitten, carry bread from the bakery to a house, and pick flowers for the fountain. A short hint sits above the map. Each finished job gives a sticker. Stickers stay on this device. If a kingdom is missing a piece, the hint asks you to place one.

**Color** makes a black-and-white page of the princess or the kingdom. **Print** sends it to the printer. **Save** downloads it. **Share** shows a link for that princess or kingdom. Opening the link on this same site loads it in the browser. Nothing is uploaded.

**Festivals** — Home can follow the date or a choice you make. December through February is the snow festival. March through May is the spring garden. **Join** keeps a sticker on this device. **Quiet** hides the festival. Older saves stay as they were.

**Sound** in the header can be muted. That choice is remembered on this device. **Help** opens a short how-to.

Saves stay in this browser only (`localStorage`). Clearing site data removes them. There is no account and no upload.

## GitHub Pages

This site is static. After it is on the `main` branch, turn on GitHub Pages for that branch and the root folder. There is no build step. Paths are relative, so a project site works as well as a user site.

## Font

The rounded letters are [Fredoka](https://github.com/hafontia/Fredoka-One) by the Fredoka Project Authors, licensed under the SIL Open Font License. See `fonts/OFL.txt`.

## Roadmap

- Stories and short quests in the kingdom (three starter quests are in)
- More themes, such as a gentle night festival (winter and seaside are in)
- Sharing a princess or a kingdom as a file or a code (a link is in)
- Printable coloring pages from a portrait or a map (black-and-white pages are in)
- Rooms you can walk inside, not only peek into
- Pets that follow along the path (done)
- More languages, with the same big icons
- A quiet music box with a few short songs
- Seasonal gardens and more starter maps
