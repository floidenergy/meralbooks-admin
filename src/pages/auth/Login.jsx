/** @format */

import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {login} from '../../store/features/user'

import style from './adminAuth.module.css'

function Login () {
  const user = useSelector(state => state.user)
	const dispatcher = useDispatch();
	const navigate  = useNavigate();

  const [requestError, setRequestError] = useState('')

	const handelInputValue = (e) => {
		if(e.target.value){
			e.target.classList.add(style['has-val'])
		}else{
			e.target.classList.remove(style['has-val']);
		}
	}

  useEffect(() => {
    if(user.isConnected){
      navigate('/');
    }
  }, [])

	const handelSubmit = async (e) => {
		e.preventDefault();
		const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

		try {
			const res = await axios.post(
        'https://meralbooks-server.floidenergy.repl.co/admin/login',
        formData,
        {
          withCredentials: true
        }
      )
			dispatcher(login(res.data));
			navigate('/');

		} catch (err) {
      
			console.log(err );
			let errorMessage = ""

			if(err.response)
				errorMessage = err.response.data.message
			else
				errorMessage = err.message
			
			console.log(errorMessage);
			return setRequestError(errorMessage);
			// return setRequestError(err)
		}
	}

  return (
    <div className={style.main}>
			
      <div className={style.limiter}>
        <div className={style['container-login100']}>
          <div className={style['wrap-login100']}>
            <form
              className={style['login100-form'] + ' ' + style['validate-form']}
							onSubmit={handelSubmit}
            >
              <span className={style['login100-form-title'] + " " + style['p-b-43']}>
                Please Login to continue
              </span>

              <div
                className={
                  style['wrap-input100'] + ' ' + style['validate-input']
                }
                data-validate='Valid email is required: ex@abc.xyz'
              >
                <input
                  className={style['input100']}
                  type='text'
                  name='username'
									onBlur={handelInputValue}
                />
                <span className={style['focus-input100']}></span>
                <span className={style['label-input100']}>
                  Username & Email
                </span>
              </div>

              <div
                className={
                  style['wrap-input100'] + ' ' + style['validate-input']
                }
                data-validate='Password is required'
              >
                <input
                  className={style['input100']}
                  type='password'
                  name='password'
									onBlur={handelInputValue}
                />
                <span className={style['focus-input100']}></span>
                <span className={style['label-input100']}>Password</span>
              </div>

              <div className={style['container-login100-form-btn']}>
                <button
                  type='submit'
                  className={style['login100-form-btn'] + ' button b-purple'}
                >
                  Login
                </button>
              </div>

              <div className={style['container-error']}>
                <p>{requestError}</p>
              </div>
            </form>
            <div
              className={style['Banner'] + ' ' + style['login100-more']}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
