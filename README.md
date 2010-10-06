# node-smashCSS
A CSS compressor/modernizer built in nodeJS

## Usage
`node smashCSS [ path/to/css/dir/ ] [ flags ]`

## Flags:
* `--combine` - Optional flag that combines all CSS into one file named main.min.css

## Needs:
* More abstract architecture. 
* Good solution for ordering CSS in when using combine flag. ORDER MATTERS!!!

## Wants:
* Remove unneeded px,%,em definitions from margins, paddings, ect. 
* Flag to leave in comments
* Flag to specify files to smash

## License
<code>
    Copyright (C) 2010 Dylan Bathurst <dylanbathurst@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
</code>    
