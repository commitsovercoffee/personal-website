---
title: "Media Log"
date: "2023-03-21"
desc: "Log of content I have consumed & enjoyed."
tags: ["personal"]
published: true
position: 4
---

<script>
	const tabs = ['Movies', 'Shows', 'Games', 'Novels'];
	let selected = $state('Movies');
</script>

Of course I have seen a lot more movies and shows, read a lot more books, and played plenty of video games, but these are the ones I really liked. And I’m always looking for more, so feel free to share your favorites! And who knows, maybe your recommendations will end up on my list :)

<div class="component mt-16 mb-8 flex gap-2 border-b border-fg">
	{#each tabs as tab, i (i)}
		<button
			onclick={() => {
				selected = tab;
			}}
			class=" {selected == tab
				? 'border-fg bg-fg text-bg '
				: 'border-fg text-fg hover:border-fg hover:bg-fg hover:text-bg'} cursor-pointer rounded-t-xl border border-b-0 px-2 py-1 transition-all duration-200 ease-in"
			>{tab}</button
		>
	{/each}
</div>

{#if selected==='Movies'}
| Movie                                 | Runtime | Year |
| ------------------------------------- | ------- | ---- |
| Oppenheimer                           | 3hr     | 2023 |
| Top Gun Maverick                      | 2hr 10m | 2022 |
| Palm Springs                          | 1hr 30m | 2020 |
| Jojo Rabbit                           | 1hr 48m | 2019 |
| Dark Waters                           | 2hr 6m  | 2019 |
| Mission Impossible Fallout            | 2hr 27m | 2018 |
| American Made                         | 1hr 55m | 2017 |
| Rogue One                             | 2hr 14m | 2016 |
| Mission Impossible Rogue Nation       | 2hr 11m | 2015 |
| The Intern                            | 2hr 1m  | 2015 |
| Edge of Tomorrow                      | 1hr 53m | 2014 |
| Whiplash                              | 1hr 46m | 2014 |
| The Lego Movie                        | 1hr 41m | 2014 |
| The Judge                             | 2hr 21m | 2014 |
| Star Trek Into Darkness               | 2hr 12m | 2013 |
| Sherlock Holmes A Game of Shadows     | 2hr 9m  | 2011 |
| Inglourious Bastards                  | 2hr 33m | 2009 |
| Star Trek                             | 2hr 7m  | 2009 |
| Valkyrie                              | 2hr 1m  | 2008 |
| The Pursuit of Happyness              | 1hr 57m | 2006 |
| The Terminal                          | 2hr 8m  | 2004 |
| Eternal Sunshine of the Spotless Mind | 1hr 48m | 2004 |
| Catch Me If You Can                   | 2hr 21m | 2002 |
| Malena                                | 1hr 48m | 2000 |
| American Psycho                       | 1hr 42m | 2000 |
| The Matrix                            | 2hr 16m | 1999 |
| Akira                                 | 1hr 4m  | 1998 |
| Life Is Beautiful                     | 1hr 56m | 1997 |
| Perfect Blue                          | 1hr 21m | 1997 |
| Jurassic Park                         | 2hr 7m  | 1993 |
| The Godfather Part II                 | 3hr 22m | 1974 |
| The Godfather                         | 2hr 55m | 1972 |
| A Clockwork Orange                    | 2hr 16m | 1971 |
| 2001 A Space Odyssey                  | 2hr 29m | 1968 |
| 12 Angry Men                          | 1h 36m  | 1957 |
{:else if selected==='Shows'}
| Show                  | Episodes | Runtime | Year      |
| --------------------- | -------- | ------- | --------- |
| Invincible            | 25       | 50m     | 2021-Now  |
| The Boys              | 40       | 60m     | 2019-Now  |
| Marvelous Mrs Maisel  | 43       | 60m     | 2017-2023 |
| One Punch Man         | 39       | 24m     | 2015-Now  |
| Silicon Valley        | 53       | 28m     | 2014-2019 |
| Rick and Morty        | 72       | 23m     | 2013-Now  |
| Modern Family         | 250      | 22m     | 2009-2020 |
| How I Met Your Mother | 208      | 23m     | 2005-2014 |
| The Office            | 188      | 22m     | 2005-2013 |
| My Name is Earl       | 96       | 22m     | 2005-2009 |
| Friends               | 236      | 22m     | 1994-2004 |
| Freaks & Geeks        | 18       | 45m     | 1999-2000 |
{:else if selected==='Games'}
| Game                          | Developer            | Year         |
| ----------------------------- | -------------------- | ------------ |
| Split Fiction                 | Hazelight Studios    | 06 Mar, 2025 |
| God of War Ragnarok           | Santa Monico Studios | 19 Sep, 2024 |
| High on Life                  | Squanch Games Inc    | 13 Dec, 2022 |
| Marvels Spider-man            | Insomniac Games      | 12 Aug, 2022 |
| God of War                    | Santa Monico Studios | 14 Jan, 2022 |
| Death Doors                   | Acid Nerve           | 20 Jul, 2021 |
| Red Dead Redemption II        | Rockstar Games       | 05 Dec, 2019 |
| Party Hard 2                  | Pinokl Games         | 25 Oct, 2018 |
| Inside                        | Playdead             | 07 Jul, 2016 |
| Far Cry Primal                | Ubisoft              | 01 Mar, 2016 |
| Lego Avengers                 | TT Games             | 26 Jan, 2016 |
| Mad Max                       | Avalanche Studios    | 01 Sep, 2015 |
| The Witcher 3                 | CD Projekt Red       | 18 May, 2015 |
| GTA V                         | Rockstar Games       | 14 Apr, 2015 |
| Tomb Raider                   | Square Enix          | 05 Mar, 2013 |
| Portal 2                      | Valve                | 19 Apr, 2011 |
| Assassins Creed Brotherhood   | Ubisoft Montreal     | 17 Mar, 2011 |
| Batman Arkham Asylum          | Rocksteady Studios   | 27 Mar, 2010 |
| Bully                         | Rockstar Games       | 21 Oct, 2008 |
{:else if selected==='Novels'}
| Book                     | Author               | Year |
| ------------------------ | -------------------- | ---- |
| Ordinary Men             | Christopher Browning | 1992 |
| The Handmaid\`s Tale     | Margaret Atwood      | 1985 |
| The Master and Margarita | Mikhail Bulgakov     | 1967 |
| Ariel                    | Sylvia Plath         | 1965 |
| The Bell Jar             | Sylvia Plath         | 1963 |
| Lolita                   | Vladimir Nabokov     | 1955 |
| Fahrenheit 451           | Ray Bradbury         | 1953 |
| 1984                     | George Orwell        | 1949 |
| Animal Farm              | George Orwell        | 1945 |
| The Road to Wigan Pier   | George Orwell        | 1936 |
| Laughter in the Dark     | Vladimir Nabokov     | 1932 |
| Brave New World          | Aldous Huxley        | 1932 |
| To the Lighthouse        | Virginia Woold       | 1927 |
| Mrs Dalloway             | Virginia Woolf       | 1925 |
| Diary of a Nobody        | George Grossmith     | 1892 |
| The Brothers Karamazov   | Fyodor Dostoevsky    | 1880 |
| Demons                   | Fyodor Dostoevsky    | 1872 |
| The Idiot                | Fyodor Dostoevsky    | 1869 |
| Crime and Punishment     | Fyodor Dostoevsky    | 1866 |
| Notes from Underground   | Fyodor Dostoevsky    | 1864 |
| White Nights             | Fyodor Dostoevsky    | 1848 |
{/if}
