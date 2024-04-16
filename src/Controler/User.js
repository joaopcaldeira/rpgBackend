import { openDb } from "../configDB.js";

export async function insertUser(req, res) {
  const { name, email, password } = req.body;
  const dbOpened = await openDb();
  const user = await dbOpened.run(
    "INSERT INTO User (name, email, password) VALUES (?,?,?)",
    [name, email, password]
  );
  res.json({ statusCode: 200 });
}

export async function updateUser(req, res) {
  let user = req.body;
  openDb().then((db) => {
    db.run("UPDATE User SET name=?, email=?, password=? WHERE id=?", [
      user.name,
      user.email,
      user.password,
      user.id,
    ]);
  });
  res.json({ statusCode: 200 });
}

export async function selectUsers(req, res) {
  openDb().then((db) => {
    db.all("SELECT *FROM User").then((users) => res.json(users));
  });
}

export async function selectUser(req, res) {
  let id = req.body.id;
  const dbOpened = await openDb();
  const user = await dbOpened.get("SELECT *FROM User WHERE id=?", [id]);
  res.json(user);
}

export async function deleteUser(req, res) {
  let id = req.body.id;
  const dbOpened = await openDb();
  const user = await dbOpened.get("DELETE FROM User WHERE id=?", [id]);
  (res) => res;
  res.json({ statusCode: 200 });
}

export async function loginTest(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  const dbOpened = await openDb();
  const user = await dbOpened.get(
    "SELECT * FROM User WHERE email=? AND password=?",
    [email, password]
  );
  console.log(user);

  if (user) {
    return res.status(200).json(user);
  }

  return res.status(401).json({ message: "Credenciais invalidas" });
}

export async function insertChar(req, res) {
  const {
    User_id,
    name,
    life,
    strength,
    resistance,
    stamina,
    will,
    speed,
    dexterity,
    charisma,
    perception,
    manaEnergy,
    magicPower,
  } = req.body;
  const dbOpened = await openDb();
  const character = await dbOpened.run(
    `INSERT INTO Character (
            name, 
            life_max, 
            life_current, 
            strength_max, 
            strength_current, 
            resistance_max,
            resistance_current, 
            stamina_max, 
            stamina_current, 
            will_max, 
            will_current, 
            speed_max, 
            speed_current, 
            dexterity_max, 
            dexterity_current, 
            charisma_max, 
            charisma_current, 
            perception_max, 
            perception_current, 
            manaEnergy_max, 
            manaEnergy_current, 
            magicPower_max, 
            magicPower_current) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      name,
      life,
      life,
      strength,
      strength,
      resistance,
      resistance,
      stamina,
      stamina,
      will,
      will,
      speed,
      speed,
      dexterity,
      dexterity,
      charisma,
      charisma,
      perception,
      perception,
      manaEnergy,
      manaEnergy,
      magicPower,
      magicPower,
    ]
  );
  return { character: character, user_id: User_id };
}

export async function insertLink(c, u) {
  const dbOpened = await openDb();
  const user = await dbOpened.run(
    "INSERT INTO Users_Characters (User_id, id_Characters) VALUES (?,?)",
    [u, c.lastID]
  );
}

export async function insertCharLink(req, res) {
  const characterAndId = await insertChar(req, res);
  const { character, user_id } = characterAndId;
  const dbOpened = await openDb();
  const char = await dbOpened.get("SELECT * FROM Character WHERE id=?", [
    character.lastID,
  ]);
  await insertLink(character, user_id);
  res.json({ statusCode: 200, character: char });
}
