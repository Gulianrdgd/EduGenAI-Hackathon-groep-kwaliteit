
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/persona" | "/persona/[id]" | "/persona/[id]/chat" | "/user" | "/user/[id]" | "/user/[id]/chat";
		RouteParams(): {
			"/persona/[id]": { id: string };
			"/persona/[id]/chat": { id: string };
			"/user/[id]": { id: string };
			"/user/[id]/chat": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/persona": { id?: string };
			"/persona/[id]": { id: string };
			"/persona/[id]/chat": { id: string };
			"/user": { id?: string };
			"/user/[id]": { id: string };
			"/user/[id]/chat": { id: string }
		};
		Pathname(): "/" | "/persona" | "/persona/" | `/persona/${string}` & {} | `/persona/${string}/` & {} | `/persona/${string}/chat` & {} | `/persona/${string}/chat/` & {} | "/user" | "/user/" | `/user/${string}` & {} | `/user/${string}/` & {} | `/user/${string}/chat` & {} | `/user/${string}/chat/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}