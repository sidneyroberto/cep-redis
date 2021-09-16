import { API_URL } from './../config'
import { Logradouro } from './../models/Logradouro'
import { clientRedis } from './../db/config'
import axios from 'axios'

export class LogradouroController {
  async findByCep(cepQuery: string): Promise<Logradouro | any> {
    const value: string = await clientRedis.get(cepQuery)
    console.log(value)
    if (value) {
      const logradouro: Logradouro = JSON.parse(value)
      return logradouro
    } else {
      const url = API_URL.replace('{CEP}', cepQuery)
      const response = await axios.get(url)
      if (response.status == 200) {
        const { cep, logradouro, complemento, bairro, localidade, uf } =
          response.data
        const logradouroObj: Logradouro = {
          cep,
          logradouro,
          complemento,
          bairro,
          localidade,
          uf,
        }

        await clientRedis.set(cepQuery, JSON.stringify(logradouroObj))

        return logradouroObj
      } else {
        return { message: 'Invalid cep' }
      }
    }
  }
}
