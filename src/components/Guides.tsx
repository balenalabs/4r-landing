import React from 'react';
import { Flex, Alert, Txt } from 'rendition';
import { DownloadImage } from './DownloadImage';
import { ExternalLink } from './ExternalLink';
import insertCard from '../img/insert-sd.gif';
import flashCard from '../img/etcher.gif';
import tasksImg from '../img/tasks.png';
import { DownloadEtcher } from './DownloadEtcher';
import { LazyImage } from './LazyImage';
import BalenaSdk from 'balena-sdk';

const renderGenericInfo = (deviceName?: string) => (
	<Txt.p>
		Getting started on a <Txt.span bold>{deviceName}</Txt.span> is simple!
		Follow these steps to download our ready-made operating system, flash it to
		an SD Card, and begin crunching data to help scientists!
	</Txt.p>
);

const renderDownloadEtcher = () => (
	<>
		<Txt fontSize={2} bold>
			Download and install{' '}
			<ExternalLink href="https://balena.io/etcher" label="balenaEtcher" />
		</Txt>
		<Txt my={3}>
			balenaEtcher is used to write the OS image you downloaded in Step 1 to
			your SD card.
		</Txt>
		<DownloadEtcher />
	</>
);

const renderDownloadOS = (
	sdk: BalenaSdk.BalenaSDK,
	app?: BalenaSdk.Application,
	deviceType?: BalenaSdk.DeviceType,
) => (
	<>
		<Txt fontSize={2} bold>
			Download the Fold for Covid project software
		</Txt>
		<Txt my={3}>
			BalenaOS is the operating system (OS) for your {deviceType?.name} and is
			preconfigured to run Rosetta software. If your device is connecting via
			WiFi you'll need to input the credentials here. We don't save any details.{' '}
			<ExternalLink href="/how-does-it-work" label="Read more" />
		</Txt>
		<DownloadImage
			sdk={sdk}
			selectedApp={app}
			selectedDeviceType={deviceType}
		/>
	</>
);

const renderLaunchEtcher = (deviceName?: string) => (
	<>
		<Txt fontSize={2} bold>
			Launch balenaEtcher and flash your SD card
		</Txt>
		<Txt my={3}>
			Launch balenaEtcher, choose the file you downloaded in Step 1, select your
			SD card and click "Flash". This will wipe all data on the card and prepare
			it for your {deviceName}.
		</Txt>
		<Flex
			alignItems="center"
			justifyContent="center"
			maxHeight="300px"
			maxWidth="400px"
			pt={2}
		>
			<LazyImage src={flashCard} alt="Flash card with Etcher" />
		</Flex>
	</>
);

const renderInsertSDCard = (deviceName?: string) => (
	<>
		<Txt fontSize={2} bold>
			Boot up your device and begin folding!
		</Txt>
		<Txt my={3}>
			Once the flashing process is complete, place the SD Card in your device,
			and power it on.
		</Txt>
		<Flex
			alignItems="center"
			justifyContent="center"
			maxHeight="300px"
			maxWidth="400px"
			pt={2}
		>
			<LazyImage src={insertCard} alt="Insert card in device" />
		</Flex>
		<Txt my={3}>
			Your {deviceName} will automatically join the global fight, and begin
			crunching data!{' '}
			<ExternalLink
				href="/how-does-it-work"
				label="Read more about how this helps"
			/>
		</Txt>
		<Txt my={3}>
			To view your {deviceName}'s current activity, visit your {deviceName}’s
			new hostname, foldforcovid.local, in a web browser like this:{' '}
			<ExternalLink
				href="http://foldforcovid.local"
				label="foldforcovid.local"
			/>
		</Txt>
		<Flex
			alignItems="center"
			justifyContent="center"
			maxHeight="300px"
			maxWidth="500px"
			pt={2}
		>
			<LazyImage src={tasksImg} alt="Rosetta tasks on your device" />
		</Flex>
		<Txt my={3}>
			If you have a display connected to your {deviceName}, the statistics and
			current information will be shown there too.
		</Txt>
	</>
);

const renderSuccess = () => (
	<>
		<Txt fontSize={2} bold>
			Add as many devices as you can, and tell everyone you know!
		</Txt>
		<Txt my={3}>
			To add more devices simply flash the same OS image you downloaded in Step
			1 to more SD cards and boot up more devices.
		</Txt>
	</>
);

const renderViewActivity = (deviceName?: string) => (
	<>
		<Txt>
			<Txt.span>
				To view your {deviceName}'s current activity, visit your {deviceName}’s
				new hostname, foldforcovid.local, in a web browser like this:{' '}
			</Txt.span>
			<ExternalLink
				href="http://foldforcovid.local"
				label="foldforcovid.local"
			/>
			.
		</Txt>
		<Flex
			alignItems="center"
			justifyContent="center"
			maxHeight="300px"
			maxWidth="500px"
			pt={2}
		>
			<LazyImage src={tasksImg} alt="Rosetta tasks on your device" />
		</Flex>
	</>
);

const guides: any = {
	'raspberrypi4-64': (
		sdk: BalenaSdk.BalenaSDK,
		app?: BalenaSdk.Application,
		deviceType?: BalenaSdk.DeviceType,
	) => ({
		intro: (
			<>
				{renderGenericInfo(deviceType?.name)}
				<Txt.p mt={3}>
					<Txt.span bold>
						Please Note: This project requires a Raspberry pi 4 with 2GB or 4GB
						of memory
					</Txt.span>
					. These simulations are large and the 1GB version of the Raspberry pi
					4 doesn’t have enough memory to run the work units Rosetta@Home
					provides.
				</Txt.p>
			</>
		),
		steps: [
			renderDownloadOS(sdk, app, deviceType),
			renderDownloadEtcher(),
			renderLaunchEtcher(),
			renderInsertSDCard(deviceType?.name),
			renderSuccess(),
		],
	}),
};

const genericGuide: any = {
	aarch64: (
		sdk: BalenaSdk.BalenaSDK,
		app?: BalenaSdk.Application,
		deviceType?: BalenaSdk.DeviceType,
	) => ({
		intro: renderGenericInfo(deviceType?.name),
		steps: [
			renderDownloadOS(sdk, app, deviceType),
			renderDownloadEtcher(),
			renderLaunchEtcher(),
			renderInsertSDCard(deviceType?.name),
			renderSuccess(),
		],
	}),
	amd64: (
		sdk: BalenaSdk.BalenaSDK,
		app?: BalenaSdk.Application,
		deviceType?: BalenaSdk.DeviceType,
	) => ({
		intro: (
			<>
				<Txt.p>
					Getting started on an unused laptop or desktop PC is easy! Follow
					these steps to download our ready-made operating system, flash it to a
					USB stick, and begin crunching data to help scientists!
				</Txt.p>
				<Txt.p mt={3}>
					<Alert emphasized danger>
						This project is intended to be used on a spare, unused computer. It
						will overwrite your existing hard drive contents, causing loss of
						ALL data on the computer. Only run this on a device that you don’t
						plan on using.
					</Alert>
				</Txt.p>
			</>
		),
		steps: [
			renderDownloadOS(sdk, app, deviceType),
			renderDownloadEtcher(),
			renderLaunchEtcher(),
			renderInsertSDCard(deviceType?.name),
			renderSuccess(),
		],
	}),
};

export const getDeviceGuide = (
	sdk: BalenaSdk.BalenaSDK,
	app?: BalenaSdk.Application,
	deviceType?: BalenaSdk.DeviceType,
	arch?: string,
) => {
	if (!deviceType || !arch) return { intro: '', steps: [] };
	if (guides[deviceType?.slug])
		return guides[deviceType?.slug](sdk, app, deviceType);
	return genericGuide[arch](sdk, app, deviceType);
};
