import { Link } from "react-router-dom";
import axios from 'axios';
import { delete_cookie, read_cookie } from 'sfcookies';

import './Settings.css';
import environment from '../../environments.json';

import Toggle from '../toggle/Toggle';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

function Settings () {
	const { register, handleSubmit } = useForm();

	const [settings, setSettings] = useState({
		'reddit': true,
		'facebook': true,
		'twitter': true
	});

	useEffect(() => {
		axios({
			method: 'get',
			url: environment['api-url'] + '/me',
			headers: {'Authorization': read_cookie('auth_token')},
		})
		.then(function(response) {
			setSettings({
				'reddit': response.data.settings.reddit,
				'facebook': response.data.settings.facebook,
				'twitter': response.data.settings.twitter
			})
		})
		.catch(function(response) {
			console.log(response);
			
		});		
	  }, []);

	const onSubmit = data => {
		console.log(data);

		let formData = new FormData();
		formData.append('facebook', data.facebook);
		formData.append('reddit', data.reddit);
		formData.append('twitter', data.twitter);

		axios({
			method: 'post',
			url: environment['api-url'] + '/settings',
			headers: {'Authorization': read_cookie('auth_token')},
			data: formData
		})
		.then(function(response) {
			console.log(response);
		})
		.catch(function(response) {
			console.log(response);
		});
		// console.log(data);
	};

	function handleChange(e) {
		console.log(e);
	}

	return (
		<div id='settings'>
			<h2 id='greeting'>Welkom, Jane Doe!</h2>
			<h2>Instellingen</h2>
			<form  onSubmit={handleSubmit(onSubmit)} className='settingsForm'>
				{/* <Toggle name='colorblind' checked={false} register={register}/>
				<p className='label'>Kleurenblindmodus</p> <br /> */}
				<p id='websiteSettingsTitle'>Websites waarop de plugin geactiveerd is:</p> <br />
				<div id='websiteSettings'>
					<Toggle name='facebook' checked={toBoolean(settings.facebook)} register={register} handleChange={handleChange}/>
					<p className='label'>Facebook</p> <br />
					<Toggle name='reddit' checked={toBoolean(settings.reddit)} register={register} handleChange={handleChange}/>
					<p className='label'>Reddit</p> <br />
					<Toggle name='twitter' checked={toBoolean(settings.twitter)} register={register} handleChange={handleChange}/>
					<p className='label'>Twitter</p>
				</div>
				<button type='submit'>Opslaan</button>
			</form>
			<div id='privacy'>
			<Link to='/privacy'>Privacyverklaring</Link> <br /><br />
			<a href='/' onClick={handleDelete} className='link'>Account en data verwijderen</a>
			</div>
			<a href='/' onClick={handleLogout}  className='link'>Uitloggen</a>
		</div>
	);
}

function handleLogout(e) {
	e.preventDefault();
	delete_cookie('loggedIn');
	delete_cookie('auth_token');
	window.location = '/'
}

function handleDelete(e) {
	e.preventDefault();

	if(window.confirm("Weet je zeker dat je je account en data wil verwijderen? Dit kan niet ongedaan gemaakt worden.")) {
		axios({
			method: 'get',
			url: environment['api-url'] + '/me/delete',
			headers: {'Authorization': read_cookie('auth_token')},
		})
		.then(function(response) {
			delete_cookie('loggedIn');
			delete_cookie('auth_token');
			window.location = '/'
		})
		.catch(function(response) {
			console.log(response);
		});
}

}

function toBoolean(string) {
	if (typeof(string) != typeof('string')) {
		return string;
	} else if (string.toLowerCase() === 'true') {
		return true;
	} else if (string.toLowerCase() === 'false') {
		return false;
	}
}

export default Settings;