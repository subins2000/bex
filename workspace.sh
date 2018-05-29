projectDir="`dirname \"$0\"`"

subl

thunar $projectDir &

xfce4-terminal -H \
    -T backend --working-directory=$projectDir -e 'env PROMPT_COMMAND="unset PROMPT_COMMAND; source bin/activate; python3 manage.py runserver;" bash' \
    --tab -T frontend --working-directory=$projectDir -e 'env PROMPT_COMMAND="unset PROMPT_COMMAND; source bin/activate" bash' \
    --tab -T git --working-directory=$projectDir
