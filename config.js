// PROTOTYPE - NOT FOR PRODUCTION
// Question: ¿Es divertido y frenético sobrevivir 5 minutos a golpes mientras el suelo desaparece, rompiendo baldosas a propósito con el especial para tirar a otros?
// Date: 2026-11-15
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
// Units: distances in tiles (1 tile = one floor slab), times in seconds, speeds in tiles/second.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- The match --------------------------------------------------------------------------
  match_time:     { value: 300, min: 60, max: 600, step: 10 },   // s, the whole match (5 minutes)
  countdown:      { value: 3, min: 0, max: 5, step: 1 },         // s of 3-2-1 before the fight
  fighters:       { value: 8, min: 4, max: 8, step: 1 },         // you + bots filling the empty seats
  arena_radius:   { value: 12, min: 5, max: 14, step: 1 },       // rings of tiles around the centre (6 -> 9 -> 11 -> 12: bigger each time you asked)
  view_tiles:     { value: 22, min: 9, max: 30, step: 1 },       // tiles across the screen: the camera follows you (15 -> 22: you see more of the map)
  obstacle_gap:   { value: 2.3, min: 1, max: 5, step: 0.1 },     // tiles kept between separate obstacles (walls of one stretch still join)

  // ---- The floor: rings fall from the outside in, faster and faster ------------------------
  ring_first:     { value: 12, min: 5, max: 90, step: 1 },       // s, the first (outer) ring starts to shake
  ring_last:      { value: 258, min: 120, max: 290, step: 1 },   // s, the last ring that falls before the final centre
  ring_keep:      { value: 2, min: 0, max: 3, step: 1 },         // rings 0..keep stay for the final 30 s
  ring_curve:     { value: 1.3, min: 1, max: 3, step: 0.1 },     // >1: gaps between ring falls shrink over the match
  ring_warn:      { value: 3, min: 1, max: 6, step: 0.25 },      // s a ring shakes red before it falls
  tile_hp:        { value: 3, min: 1, max: 6, step: 1 },         // cracks a slab takes before it breaks
  break_warn:     { value: 0.55, min: 0.1, max: 2, step: 0.05 }, // s a broken slab shakes before it drops
  final_window:   { value: 30, min: 10, max: 60, step: 5 },      // s, the last stretch: the centre cracks on its own
  final_crack_every: { value: 0.45, min: 0.1, max: 2, step: 0.05 }, // s between self-cracks in the last stretch

  // ---- Catapults: boulders from off the island, more and more often --------------------------
  catapult_start: { value: 90, min: 0, max: 280, step: 5 },      // s when the first boulder flies in
  catapult_every: { value: 8, min: 1, max: 30, step: 0.5 },      // s between boulders at the start of the volley
  catapult_every_end: { value: 2.5, min: 0.5, max: 15, step: 0.5 }, // s between boulders at the end
  catapult_warn:  { value: 1.4, min: 0.5, max: 4, step: 0.1 },   // s the shadow grows before impact
  catapult_radius:{ value: 1.1, min: 0.5, max: 3, step: 0.1 },
  catapult_dmg:   { value: 16, min: 0, max: 60, step: 1 },
  catapult_crack: { value: 2, min: 0, max: 6, step: 1 },
  catapult_on_you:{ value: 0.45, min: 0, max: 1, step: 0.05 },   // chance a boulder aims near you

  // ---- Fighters -----------------------------------------------------------------------------
  hp:             { value: 100, min: 30, max: 300, step: 10 },   // base life; each hero multiplies it
  player_speed:   { value: 4.6, min: 2, max: 8, step: 0.1 },     // tiles/s (each hero multiplies it; the knight is x1)
  bot_speed:      { value: 4.6, min: 2, max: 8, step: 0.1 },     // tiles/s (iteration 1: 4.1 -> 4.6)
  friction:       { value: 7.5, min: 2, max: 15, step: 0.5 },    // knockback decay per second
  low_hp_fly:     { value: 1.2, min: 0, max: 2, step: 0.1 },     // extra knockback at 0 hp (x1 + this): the hurt fly further
  dodge_speed:    { value: 11, min: 4, max: 20, step: 0.5 },     // tiles/s during a dodge
  dodge_time:     { value: 0.18, min: 0.05, max: 0.5, step: 0.01 },
  dodge_cd:       { value: 1.1, min: 0.2, max: 4, step: 0.1 },
  special_per_hit:{ value: 9, min: 5, max: 60, step: 1 },        // special meter per hit landed (of 100)
  special_passive:{ value: 1.5, min: 0, max: 10, step: 0.5 },    // special meter per second, on its own
  hp_regen:       { value: 6, min: 0, max: 30, step: 1 },        // hp per second back after a quiet spell
  regen_delay:    { value: 3.5, min: 0.5, max: 10, step: 0.5 },  // s without being hit before hp comes back
  kill_credit:    { value: 5, min: 1, max: 10, step: 0.5 },      // s after a hit that a fall still counts as your knockout
  shield_block:   { value: 0.45, min: 0, max: 1, step: 0.05 },   // knight: share of a hit from the front the shield takes away

  // ---- The four heroes: life and speed multipliers -----------------------------------------
  knight_hp:  { value: 1.2, min: 0.5, max: 2, step: 0.05 },  knight_speed: { value: 1, min: 0.6, max: 1.4, step: 0.02 },
  smith_hp:   { value: 1.35, min: 0.5, max: 2, step: 0.05 }, smith_speed:  { value: 0.9, min: 0.6, max: 1.4, step: 0.02 },
  archer_hp:  { value: 0.85, min: 0.5, max: 2, step: 0.05 }, archer_speed: { value: 1.08, min: 0.6, max: 1.4, step: 0.02 },
  lancer_hp:  { value: 1, min: 0.5, max: 2, step: 0.05 },    lancer_speed: { value: 1.04, min: 0.6, max: 1.4, step: 0.02 },

  // ---- Weapons: hit damage, knockback (tiles/s), cooldown (s), reach (tiles) -----------------
  sword_dmg:   { value: 7,  min: 1, max: 40, step: 1 }, sword_knock:  { value: 5.5, min: 0, max: 25, step: 0.5 },
  sword_cd:    { value: 0.33, min: 0.1, max: 2, step: 0.01 }, sword_reach: { value: 1.15, min: 0.5, max: 3, step: 0.05 },
  hammer_dmg:  { value: 12, min: 1, max: 40, step: 1 }, hammer_knock: { value: 9, min: 0, max: 25, step: 0.5 },
  hammer_cd:   { value: 0.7, min: 0.1, max: 2, step: 0.01 }, hammer_reach:{ value: 1.25, min: 0.5, max: 3, step: 0.05 },
  spear_dmg:   { value: 8, min: 1, max: 40, step: 1 }, spear_knock:  { value: 6.5, min: 0, max: 25, step: 0.5 },
  spear_cd:    { value: 0.45, min: 0.1, max: 2, step: 0.01 }, spear_reach: { value: 1.9, min: 0.5, max: 3, step: 0.05 },
  bow_dmg:     { value: 7,  min: 1, max: 40, step: 1 }, bow_knock:    { value: 3.5, min: 0, max: 25, step: 0.5 },
  bow_cd:      { value: 0.42, min: 0.1, max: 2, step: 0.01 }, arrow_speed: { value: 13, min: 4, max: 25, step: 0.5 },

  // ---- Abilities: each one cracks the floor ---------------------------------------------------
  spin_radius:   { value: 1.8, min: 0.5, max: 3, step: 0.1 },    // knight: Torbellino
  spin_crack_radius: { value: 1.2, min: 0, max: 3, step: 0.1 },
  spin_crack:    { value: 1, min: 0, max: 6, step: 1 },
  slam_radius:   { value: 2.2, min: 0.5, max: 4, step: 0.1 },    // smith: Terremoto
  slam_crack_radius: { value: 1.4, min: 0, max: 4, step: 0.1 },  // the circle of floor the slam breaks (hits reach slam_radius)
  slam_crack:    { value: 3, min: 0, max: 6, step: 1 },
  charge_dist:   { value: 4.6, min: 1, max: 8, step: 0.2 },      // lancer: Embestida
  charge_crack:  { value: 1, min: 0, max: 6, step: 1 },
  rain_dist:     { value: 4.5, min: 1, max: 8, step: 0.5 },      // archer: Lluvia de flechas
  rain_radius:   { value: 1.8, min: 0.5, max: 4, step: 0.1 },
  rain_crack_radius: { value: 1.3, min: 0, max: 4, step: 0.1 },
  rain_crack:    { value: 2, min: 0, max: 6, step: 1 },
  special_dmg_mult: { value: 1.6, min: 0.5, max: 4, step: 0.1 }, // ability damage = weapon damage x this

  // ---- The map: obstacles and what crates drop ------------------------------------------------
  crate_hp:      { value: 3, min: 1, max: 8, step: 1 },          // hits a crate takes
  potion_heal:   { value: 35, min: 5, max: 100, step: 5 },       // life a potion gives back
  gem_charge:    { value: 45, min: 5, max: 100, step: 5 },       // special meter a gem gives
  potion_every:  { value: 14, min: 3, max: 60, step: 1 },        // s between potions appearing on their own
  pickup_max:    { value: 6, min: 0, max: 15, step: 1 },

  // ---- Bots: harder now (iteration 1), harder still at the end --------------------------------
  bot_react:       { value: 0.26, min: 0.05, max: 1, step: 0.01 }, // s between decisions at the start (was 0.45)
  bot_react_final: { value: 0.1, min: 0.05, max: 1, step: 0.01 },  // s between decisions in the last stretch
  bot_aim_miss:    { value: 0.25, min: 0, max: 1, step: 0.05 },    // chance a bot holds its swing a beat at the start (was 0.65)
  bot_final_dmg:   { value: 1.45, min: 1, max: 3, step: 0.05 },    // bot damage x this in the last stretch
  warmup:          { value: 12, min: 0, max: 90, step: 1 },        // s of warm-up: bots hit softer and prefer each other (was 40)
  warmup_dmg:      { value: 0.8, min: 0.1, max: 1, step: 0.05 },   // bot damage x this during the warm-up
  bot_hunt_you:    { value: 0.7, min: 0.3, max: 1.5, step: 0.05 }, // <1: after the warm-up bots treat you as nearer than you are
  bot_special:     { value: 0.7, min: 0, max: 1, step: 0.05 },     // chance a bot with a full meter uses it when a rival is in range
  bot_special_gain:{ value: 0.9, min: 0.1, max: 2, step: 0.05 },   // bots fill their special meter at this rate of yours
  bot_flee_hp:     { value: 0.25, min: 0, max: 1, step: 0.05 },    // a bot below this share of its life backs off to recover (not in the last stretch)
  bot_fight_start: { value: 0.65, min: 0, max: 1, step: 0.05 },    // share of the time a bot picks fights at the start (rises to 1 by the end)
  bot_mood_time:   { value: 4, min: 1, max: 15, step: 0.5 },       // s a bot keeps to fighting or roaming before it rethinks
  bot_vs_bot_dmg:  { value: 0.6, min: 0.1, max: 1, step: 0.05 },   // damage when a bot hits a bot
  bot_vs_bot_knock:{ value: 0.5, min: 0.1, max: 1, step: 0.05 },   // knockback when a bot hits a bot
  bot_edge_care:   { value: 0.6, min: 0, max: 1, step: 0.05 },     // how strongly a bot near a hole steers back inward
  bot_dodge:       { value: 0.35, min: 0, max: 1, step: 0.02 },    // chance a bot dodges a swing near it (rises at the end)
};
