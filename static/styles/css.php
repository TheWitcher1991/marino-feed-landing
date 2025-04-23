<?php
function compress($buffer) {
    $buffer = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $buffer);
    $buffer = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $buffer);
    return $buffer;
}

header('Content-type: text/css');

ob_start("compress");

include('keyframes.css');
include('vars.css');
include('normalize.css');
include('wrapper.css');
include('media.css');

ob_end_flush();
?>
