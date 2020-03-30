const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    
    const [count] = await connection('incidents').count();
    
    const ongsData = [
      'ongs.city',
      'ongs.email',
      'ongs.name',
      'ongs.uf',
      'ongs.whatsapp'
    ];

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', ...ongsData]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      description,
      ong_id,
      title,
      value
    });

    response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

  console.log(ong_id)


 

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();



      
      
      
    if (incident.ong_id !== ong_id ) {
      return response.status(401).json({
        error: 'operation not permited.'
      });
    };


    

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
}