import { TestBed } from '@angular/core/testing';

import { FileReaderService } from './file-reader.service';
import { SettingsData } from '../settings';

describe('FileReaderService', () =>
{
	beforeEach(() => TestBed.configureTestingModule({}));

	describe('service', () =>
	{
		it('should be created', () =>
		{
			const service: FileReaderService = TestBed.get(FileReaderService);
			expect(service).toBeTruthy();
		});
	});

	describe('readAsText', () =>
	{
		it('should return a text string of the given file', (done) =>
		{
			let content = "This is the content";
			let file = new File([content], "file.txt");

			const service: FileReaderService = TestBed.get(FileReaderService);
			service.readAsText(file).then(result =>
			{
				expect(result).toEqual(content);
				done();
			});
		});

		it('should deserialize a given file object', (done) =>
		{
			let settings: SettingsData = {
				httpPort: 80,
				lightingVenueURI: "http://localhost",
				reaperURI: "http://someotherhost"
			};

			let file = new File([JSON.stringify(settings)], "file.txt");

			const service: FileReaderService = TestBed.get(FileReaderService);
			service.deserialize<SettingsData>(file).then(result =>
			{
				expect(result).toEqual(settings);
				done();
			});
		});
	});
});
