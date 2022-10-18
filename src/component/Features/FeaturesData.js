import React from 'react';
import { BsPhone } from 'react-icons/bs';
import { MdSlowMotionVideo } from 'react-icons/md';
import { FaPhotoVideo } from 'react-icons/fa';

const iconStyle = (Icon) => <Icon size="3rem" color="#fefefe" />;


/*{
	name: 'ChatBot',
	description: 'Lets have a conversation with Bot, He will help you',
	icon: iconStyle(BsPhone),
	imgClass: 'three',
	background: linear-gradient(220deg, #e7d1ff 0%, #8383ef 100%)
	background: linear-gradient(130deg, #ffaf73 0%, #fffecc 100%)
},
{
	name: 'Music',
	description: 'Listen to the best music that suits you',
	icon: iconStyle(BsPhone),
	imgClass: 'four',
},
{
	name: 'Maps',
	description: 'Is your condition critical, no worries. Thats why we are here',
	icon: iconStyle(FaPhotoVideo),
	imgClass: 'six',
},*/
export const featuresData = [
	{
		name: 'Social Media',
		description:
			'We find your state of depression using your social media data',
		icon: iconStyle(BsPhone),
		imgClass: 'one',
	},
	{
		name: 'Facial Recognition',
		description: 'We can predict how much you are drpressed with your face',
		icon: iconStyle(BsPhone),
		imgClass: 'two',
	},
	
	{
		name: 'Status',
		description: 'Share your thought , have a nice feedback from us',
		icon: iconStyle(MdSlowMotionVideo),
		imgClass: 'five',
	},
	
];