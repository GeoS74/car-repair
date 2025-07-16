const prod = false; 
export default {
  catalog: {
    back: {
      host: prod ? '' : 'http://localhost',
      port: prod ? 0 : 3100,
    }
  },
  auth: {
    back: {
      host: prod ? '' : 'http://localhost',
      port: prod ? 0 : 3030,
    }
  },
  info: {
    back: {
      host: prod ? '' : 'http://localhost',
      port: prod ? 0 : 3201,
    }
  },
  mnote: {
    back: {
      host: prod ? '' : 'http://localhost',
      port: prod ? 0 : 3300,
    }
  },
}