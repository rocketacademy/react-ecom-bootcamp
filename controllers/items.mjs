export default function initItemsController(db) {
  const index = async (request, response) => {
    try {
      const items = await db.Item.findAll();
      response.send({ items });
    } catch (error) {
      console.log(error);
    }
  };

  const postItem = async (request, response) => {
    const { price, description, name } = request.body;

    db.Item.create({ price: 10, description, name })
      .then(({ dataValues }) => {
        console.log(`[item create]`);
        console.log(dataValues);

        response.send(dataValues);
      })
      .catch(() => {
        response.sendStatus(500);
      });
  };

  return {
    index,
    postItem,
  };
}
