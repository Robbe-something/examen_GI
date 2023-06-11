# @Input()
- Improteren! import { Input } from '@angular/core';
- Stel je hebt een waarde die input is: geen constructor of OnInit nodig maar wel zeggen dat undefined kan zijn, anders crasht en geen edit
```TS
export class NotificationComponent {
	@Input()
	boodschap : string | undefined;
}
```
Defaultwaarde geven kan ook
