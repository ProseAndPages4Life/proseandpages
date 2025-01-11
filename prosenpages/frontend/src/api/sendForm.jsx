

import {loginReq } from '../../src/api/config'
export const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    const res = await loginReq(values);
    console.log(res);
  }
  )
 